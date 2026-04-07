import { useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  role: "admin" | "student" | "teacher" | null;
  loading: boolean;
}

type AppRole = "admin" | "student" | "teacher";

const roleCache = new Map<string, AppRole>();
const listeners = new Set<() => void>();

let authState: AuthState = {
  user: null,
  role: null,
  loading: true,
};

let initializing = false;
let restored = false;
let activeRequestId = 0;

function emitChange() {
  listeners.forEach((listener) => listener());
}

function setAuthState(nextState: AuthState | ((prev: AuthState) => AuthState)) {
  authState = typeof nextState === "function" ? nextState(authState) : nextState;
  emitChange();
}

async function fetchRole(userId: string): Promise<AppRole | null> {
  const cached = roleCache.get(userId);
  if (cached) return cached;

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Failed to load user role", error);
    return null;
  }

  const nextRole = (data?.role as AppRole | undefined) ?? "student";
  roleCache.set(userId, nextRole);
  return nextRole;
}

async function syncSession(session: Session | null) {
  const requestId = ++activeRequestId;
  const nextUser = session?.user ?? null;

  if (!nextUser) {
    roleCache.clear();
    setAuthState({ user: null, role: null, loading: false });
    return;
  }

  const cachedRole = roleCache.get(nextUser.id);
  if (cachedRole) {
    setAuthState({ user: nextUser, role: cachedRole, loading: false });
    return;
  }

  setAuthState((prev) => ({
    user: nextUser,
    role: prev.user?.id === nextUser.id ? prev.role : null,
    loading: true,
  }));

  const fetchedRole = await fetchRole(nextUser.id);
  if (requestId !== activeRequestId) return;

  const metadataRole = nextUser.user_metadata?.role;
  const fallbackRole =
    metadataRole === "admin" || metadataRole === "student" || metadataRole === "teacher"
      ? metadataRole
      : null;

  setAuthState({
    user: nextUser,
    role: fetchedRole ?? fallbackRole,
    loading: false,
  });
}

function initAuthStore() {
  if (initializing || restored) return;
  initializing = true;

  supabase.auth.onAuthStateChange((event, session) => {
    if (!restored && event === "INITIAL_SESSION") return;
    void syncSession(session);
  });

  void supabase.auth
    .getSession()
    .then(({ data: { session } }) => syncSession(session))
    .catch((error) => {
      console.error("Failed to restore auth session", error);
      setAuthState({ user: null, role: null, loading: false });
    })
    .finally(() => {
      restored = true;
      initializing = false;
    });
}

export function useAuth(): AuthState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      initAuthStore();

      return () => {
        listeners.delete(listener);
      };
    },
    () => authState,
    () => authState
  );
}
