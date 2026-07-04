import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface CurriculumProgressState {
  completedSteps: number[];
  checklists: Record<string, Record<string, boolean>>;
  notes: Record<string, string>;
  quizAnswers: Record<string, Record<string, number>>;
  quizSubmitted: Record<string, boolean>;
}

const empty: CurriculumProgressState = {
  completedSteps: [],
  checklists: {},
  notes: {},
  quizAnswers: {},
  quizSubmitted: {},
};

export function useCurriculumProgress(categorySlug: string | undefined, courseIndex: number) {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<CurriculumProgressState>(empty);
  const [loading, setLoading] = useState(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef<CurriculumProgressState>(empty);

  // Load from backend
  useEffect(() => {
    if (authLoading) return;
    if (!user || !categorySlug) {
      setState(empty);
      latest.current = empty;
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    supabase
      .from("curriculum_progress")
      .select("completed_steps, checklists, notes, quiz_answers, quiz_submitted")
      .eq("user_id", user.id)
      .eq("category_slug", categorySlug)
      .eq("course_index", courseIndex)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const next: CurriculumProgressState = data
          ? {
              completedSteps: (data.completed_steps as number[]) ?? [],
              checklists: (data.checklists as any) ?? {},
              notes: (data.notes as any) ?? {},
              quizAnswers: (data.quiz_answers as any) ?? {},
              quizSubmitted: (data.quiz_submitted as any) ?? {},
            }
          : empty;
        setState(next);
        latest.current = next;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, categorySlug, courseIndex, authLoading]);

  const persist = useCallback(() => {
    if (!user || !categorySlug) return;
    const s = latest.current;
    supabase
      .from("curriculum_progress")
      .upsert(
        {
          user_id: user.id,
          category_slug: categorySlug,
          course_index: courseIndex,
          completed_steps: s.completedSteps,
          checklists: s.checklists,
          notes: s.notes,
          quiz_answers: s.quizAnswers,
          quiz_submitted: s.quizSubmitted,
        },
        { onConflict: "user_id,category_slug,course_index" }
      )
      .then(() => {});
  }, [user?.id, categorySlug, courseIndex]);

  const scheduleSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(persist, 500);
  }, [persist]);

  const update = useCallback(
    (updater: (prev: CurriculumProgressState) => CurriculumProgressState) => {
      setState((prev) => {
        const next = updater(prev);
        latest.current = next;
        scheduleSave();
        return next;
      });
    },
    [scheduleSave]
  );

  return { state, update, loading: loading || authLoading, isAuthed: !!user };
}