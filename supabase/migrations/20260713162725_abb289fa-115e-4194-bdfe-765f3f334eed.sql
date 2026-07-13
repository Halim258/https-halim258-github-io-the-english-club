
-- Conversations
CREATE TABLE public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  is_group boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_message_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversations TO authenticated;
GRANT ALL ON public.conversations TO service_role;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- Conversation members
CREATE TABLE public.conversation_members (
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  last_read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (conversation_id, user_id)
);
CREATE INDEX idx_conv_members_user ON public.conversation_members(user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversation_members TO authenticated;
GRANT ALL ON public.conversation_members TO service_role;
ALTER TABLE public.conversation_members ENABLE ROW LEVEL SECURITY;

-- Messages
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL CHECK (length(content) > 0 AND length(content) <= 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_messages_conv_time ON public.messages(conversation_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Security definer helper to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.is_conversation_member(_conv uuid, _user uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.conversation_members
    WHERE conversation_id = _conv AND user_id = _user
  );
$$;

-- Conversations policies
CREATE POLICY "Members can view their conversations"
  ON public.conversations FOR SELECT TO authenticated
  USING (public.is_conversation_member(id, auth.uid()));

CREATE POLICY "Authenticated users can create conversations"
  ON public.conversations FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Members can update conversation"
  ON public.conversations FOR UPDATE TO authenticated
  USING (public.is_conversation_member(id, auth.uid()));

-- Conversation members policies
CREATE POLICY "Members can view members of their conversations"
  ON public.conversation_members FOR SELECT TO authenticated
  USING (public.is_conversation_member(conversation_id, auth.uid()));

CREATE POLICY "Users can add members to conversations they belong to or created"
  ON public.conversation_members FOR INSERT TO authenticated
  WITH CHECK (
    -- Allow adding self when creating (creator inserts own row first)
    user_id = auth.uid()
    OR public.is_conversation_member(conversation_id, auth.uid())
    OR EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = conversation_id AND c.created_by = auth.uid())
  );

CREATE POLICY "Users can update their own membership"
  ON public.conversation_members FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can leave conversations"
  ON public.conversation_members FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Messages policies
CREATE POLICY "Members can view messages"
  ON public.messages FOR SELECT TO authenticated
  USING (public.is_conversation_member(conversation_id, auth.uid()));

CREATE POLICY "Members can send messages as themselves"
  ON public.messages FOR INSERT TO authenticated
  WITH CHECK (
    sender_id = auth.uid()
    AND public.is_conversation_member(conversation_id, auth.uid())
  );

CREATE POLICY "Senders can delete their own messages"
  ON public.messages FOR DELETE TO authenticated
  USING (sender_id = auth.uid());

-- Bump last_message_at on new message
CREATE OR REPLACE FUNCTION public.bump_conversation_last_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.conversations
    SET last_message_at = NEW.created_at
    WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_bump_conv_last_message
AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION public.bump_conversation_last_message();

-- Realtime
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.conversations REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;

-- Helper: get or create 1-on-1 conversation between current user and another
CREATE OR REPLACE FUNCTION public.get_or_create_direct_conversation(_other_user uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_me uuid := auth.uid();
  v_conv uuid;
BEGIN
  IF v_me IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF _other_user IS NULL OR _other_user = v_me THEN RAISE EXCEPTION 'Invalid user'; END IF;

  SELECT c.id INTO v_conv
  FROM public.conversations c
  WHERE c.is_group = false
    AND EXISTS (SELECT 1 FROM public.conversation_members m1 WHERE m1.conversation_id = c.id AND m1.user_id = v_me)
    AND EXISTS (SELECT 1 FROM public.conversation_members m2 WHERE m2.conversation_id = c.id AND m2.user_id = _other_user)
    AND (SELECT count(*) FROM public.conversation_members m WHERE m.conversation_id = c.id) = 2
  LIMIT 1;

  IF v_conv IS NOT NULL THEN RETURN v_conv; END IF;

  INSERT INTO public.conversations (is_group, created_by) VALUES (false, v_me) RETURNING id INTO v_conv;
  INSERT INTO public.conversation_members (conversation_id, user_id) VALUES (v_conv, v_me), (v_conv, _other_user);
  RETURN v_conv;
END;
$$;

-- Helper: create group conversation
CREATE OR REPLACE FUNCTION public.create_group_conversation(_title text, _member_ids uuid[])
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_me uuid := auth.uid();
  v_conv uuid;
  v_uid uuid;
BEGIN
  IF v_me IS NULL THEN RAISE EXCEPTION 'Not authenticated'; END IF;
  IF _title IS NULL OR length(trim(_title)) = 0 OR length(_title) > 100 THEN RAISE EXCEPTION 'Invalid title'; END IF;

  INSERT INTO public.conversations (is_group, title, created_by) VALUES (true, _title, v_me) RETURNING id INTO v_conv;
  INSERT INTO public.conversation_members (conversation_id, user_id) VALUES (v_conv, v_me);

  IF _member_ids IS NOT NULL THEN
    FOREACH v_uid IN ARRAY _member_ids LOOP
      IF v_uid <> v_me THEN
        INSERT INTO public.conversation_members (conversation_id, user_id) VALUES (v_conv, v_uid)
        ON CONFLICT DO NOTHING;
      END IF;
    END LOOP;
  END IF;

  RETURN v_conv;
END;
$$;
