import { supabase } from "@/integrations/supabase/client";

type NotificationType = "achievement" | "lesson" | "streak" | "tip" | "info";

interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
}

export async function createNotification({ userId, title, message, type, link }: CreateNotificationParams) {
  return supabase.from("notifications").insert({
    user_id: userId,
    title,
    message,
    type,
    link: link || null,
  });
}

export async function notifyLessonComplete(userId: string, levelId: string, lessonNumber: number, score?: number | null) {
  const scoreText = score !== null && score !== undefined ? ` with a score of ${score}%` : "";
  await createNotification({
    userId,
    title: "Lesson Complete! 🎉",
    message: `You finished ${levelId.toUpperCase()} Lesson ${lessonNumber}${scoreText}. Keep up the momentum!`,
    type: "lesson",
    link: `/courses/${levelId}`,
  });
}

export async function notifyAchievement(userId: string, badgeLabel: string, badgeDesc: string) {
  await createNotification({
    userId,
    title: `Achievement Unlocked: ${badgeLabel} 🏆`,
    message: badgeDesc,
    type: "achievement",
    link: "/dashboard",
  });
}

export async function notifyStreakMilestone(userId: string, streak: number) {
  await createNotification({
    userId,
    title: `${streak}-Day Streak! 🔥`,
    message: `You've been learning for ${streak} days in a row. Amazing dedication!`,
    type: "streak",
    link: "/dashboard",
  });
}

export async function notifyWelcome(userId: string) {
  await createNotification({
    userId,
    title: "Welcome to The English Club! 👋",
    message: "Start by taking a placement test to find your level, then explore our 200+ structured lessons.",
    type: "info",
    link: "/placement-test",
  });
}
