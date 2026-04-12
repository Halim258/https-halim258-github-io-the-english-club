export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_key: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_key: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_key?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string
          id: string
          lesson_number: number
          level_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lesson_number: number
          level_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lesson_number?: number
          level_id?: string
          user_id?: string
        }
        Relationships: []
      }
      community_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          reaction_type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          comments_count: number
          content: string
          created_at: string
          id: string
          image_url: string | null
          likes_count: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comments_count?: number
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes_count?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comments_count?: number
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes_count?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_challenge_completions: {
        Row: {
          challenge_id: string
          completed_at: string
          id: string
          is_correct: boolean
          user_id: string
          xp_earned: number
        }
        Insert: {
          challenge_id: string
          completed_at?: string
          id?: string
          is_correct?: boolean
          user_id: string
          xp_earned?: number
        }
        Update: {
          challenge_id?: string
          completed_at?: string
          id?: string
          is_correct?: boolean
          user_id?: string
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_challenge_completions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_challenges: {
        Row: {
          challenge_date: string
          challenge_type: string
          correct_answer: string
          created_at: string
          difficulty: string
          hint: string | null
          id: string
          options: Json
          question: string
          xp_reward: number
        }
        Insert: {
          challenge_date?: string
          challenge_type?: string
          correct_answer: string
          created_at?: string
          difficulty?: string
          hint?: string | null
          id?: string
          options?: Json
          question: string
          xp_reward?: number
        }
        Update: {
          challenge_date?: string
          challenge_type?: string
          correct_answer?: string
          created_at?: string
          difficulty?: string
          hint?: string | null
          id?: string
          options?: Json
          question?: string
          xp_reward?: number
        }
        Relationships: []
      }
      discussion_answers: {
        Row: {
          answer_text: string
          created_at: string
          id: string
          lesson_number: number
          level_id: string
          question_index: number
          question_text: string
          updated_at: string
          user_id: string
        }
        Insert: {
          answer_text: string
          created_at?: string
          id?: string
          lesson_number: number
          level_id: string
          question_index: number
          question_text: string
          updated_at?: string
          user_id: string
        }
        Update: {
          answer_text?: string
          created_at?: string
          id?: string
          lesson_number?: number
          level_id?: string
          question_index?: number
          question_text?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      flashcard_progress: {
        Row: {
          created_at: string
          ease_factor: number
          id: string
          interval_days: number
          level_id: string
          next_review: string
          repetitions: number
          user_id: string
          word: string
        }
        Insert: {
          created_at?: string
          ease_factor?: number
          id?: string
          interval_days?: number
          level_id: string
          next_review?: string
          repetitions?: number
          user_id: string
          word: string
        }
        Update: {
          created_at?: string
          ease_factor?: number
          id?: string
          interval_days?: number
          level_id?: string
          next_review?: string
          repetitions?: number
          user_id?: string
          word?: string
        }
        Relationships: []
      }
      group_enrollments: {
        Row: {
          created_at: string
          group_id: string
          id: string
          status: string
          student_email: string | null
          student_name: string
          student_phone: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          status?: string
          student_email?: string | null
          student_name: string
          student_phone?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          status?: string
          student_email?: string | null
          student_name?: string
          student_phone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_enrollments_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "school_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          id: string
          lesson_number: number
          level_id: string
          score: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_number: number
          level_id: string
          score?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          id?: string
          lesson_number?: number
          level_id?: string
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message: string
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      placement_test_results: {
        Row: {
          answers: Json
          cefr_level: string
          created_at: string
          id: string
          score: number
          time_taken_seconds: number | null
          total_questions: number
          user_id: string | null
        }
        Insert: {
          answers?: Json
          cefr_level: string
          created_at?: string
          id?: string
          score: number
          time_taken_seconds?: number | null
          total_questions?: number
          user_id?: string | null
        }
        Update: {
          answers?: Json
          cefr_level?: string
          created_at?: string
          id?: string
          score?: number
          time_taken_seconds?: number | null
          total_questions?: number
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          youtube_intro_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          youtube_intro_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          youtube_intro_url?: string | null
        }
        Relationships: []
      }
      school_attendance: {
        Row: {
          check_in: string | null
          check_out: string | null
          created_at: string | null
          id: string
          notes: string | null
          session_id: string
          status: string
          student_id_legacy: number | null
          student_name: string
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          session_id: string
          status?: string
          student_id_legacy?: number | null
          student_name: string
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          session_id?: string
          status?: string
          student_id_legacy?: number | null
          student_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_attendance_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "school_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      school_employees: {
        Row: {
          created_at: string | null
          id: string
          legacy_id: number | null
          name: string
          phone_number: string | null
          phone_number_2: string | null
          position: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          legacy_id?: number | null
          name: string
          phone_number?: string | null
          phone_number_2?: string | null
          position?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          legacy_id?: number | null
          name?: string
          phone_number?: string | null
          phone_number_2?: string | null
          position?: string
        }
        Relationships: []
      }
      school_fixed_expenses: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          amount?: number
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      school_groups: {
        Row: {
          created_at: string | null
          days: string | null
          description: string | null
          end_time: string | null
          group_time: string | null
          id: string
          is_public: boolean
          legacy_id: number | null
          level: string | null
          max_students: number | null
          start_date: string | null
          start_time: string | null
          teacher_email: string | null
          teacher_id: number | null
          teacher_name: string | null
        }
        Insert: {
          created_at?: string | null
          days?: string | null
          description?: string | null
          end_time?: string | null
          group_time?: string | null
          id?: string
          is_public?: boolean
          legacy_id?: number | null
          level?: string | null
          max_students?: number | null
          start_date?: string | null
          start_time?: string | null
          teacher_email?: string | null
          teacher_id?: number | null
          teacher_name?: string | null
        }
        Update: {
          created_at?: string | null
          days?: string | null
          description?: string | null
          end_time?: string | null
          group_time?: string | null
          id?: string
          is_public?: boolean
          legacy_id?: number | null
          level?: string | null
          max_students?: number | null
          start_date?: string | null
          start_time?: string | null
          teacher_email?: string | null
          teacher_id?: number | null
          teacher_name?: string | null
        }
        Relationships: []
      }
      school_income: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          date: string | null
          id: string
          legacy_id: number | null
          reason: string | null
          receipt_number: number | null
        }
        Insert: {
          amount?: number
          category?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          legacy_id?: number | null
          reason?: string | null
          receipt_number?: number | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          legacy_id?: number | null
          reason?: string | null
          receipt_number?: number | null
        }
        Relationships: []
      }
      school_newcomers: {
        Row: {
          access_method: string | null
          client_name: string
          client_number: string | null
          created_at: string | null
          id: string
          legacy_id: number | null
          reserved: boolean | null
          the_date: string | null
        }
        Insert: {
          access_method?: string | null
          client_name: string
          client_number?: string | null
          created_at?: string | null
          id?: string
          legacy_id?: number | null
          reserved?: boolean | null
          the_date?: string | null
        }
        Update: {
          access_method?: string | null
          client_name?: string
          client_number?: string | null
          created_at?: string | null
          id?: string
          legacy_id?: number | null
          reserved?: boolean | null
          the_date?: string | null
        }
        Relationships: []
      }
      school_outcome: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          date: string | null
          id: string
          legacy_id: number | null
          reason: string | null
        }
        Insert: {
          amount?: number
          category?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          legacy_id?: number | null
          reason?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          date?: string | null
          id?: string
          legacy_id?: number | null
          reason?: string | null
        }
        Relationships: []
      }
      school_products: {
        Row: {
          created_at: string | null
          id: string
          legacy_id: number | null
          per: string | null
          price: number | null
          price_for_members: number | null
          product: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          legacy_id?: number | null
          per?: string | null
          price?: number | null
          price_for_members?: number | null
          product: string
        }
        Update: {
          created_at?: string | null
          id?: string
          legacy_id?: number | null
          per?: string | null
          price?: number | null
          price_for_members?: number | null
          product?: string
        }
        Relationships: []
      }
      school_receipts: {
        Row: {
          created_at: string | null
          fees: number | null
          given_by: number | null
          id: string
          item_id: number | null
          legacy_number: number | null
          paid_fees: number | null
          phone_number: string | null
          receipt_number: number | null
          remaining_fees: number | null
          reservation_date: string | null
          student_id_legacy: number | null
          student_name: string | null
        }
        Insert: {
          created_at?: string | null
          fees?: number | null
          given_by?: number | null
          id?: string
          item_id?: number | null
          legacy_number?: number | null
          paid_fees?: number | null
          phone_number?: string | null
          receipt_number?: number | null
          remaining_fees?: number | null
          reservation_date?: string | null
          student_id_legacy?: number | null
          student_name?: string | null
        }
        Update: {
          created_at?: string | null
          fees?: number | null
          given_by?: number | null
          id?: string
          item_id?: number | null
          legacy_number?: number | null
          paid_fees?: number | null
          phone_number?: string | null
          receipt_number?: number | null
          remaining_fees?: number | null
          reservation_date?: string | null
          student_id_legacy?: number | null
          student_name?: string | null
        }
        Relationships: []
      }
      school_sessions: {
        Row: {
          created_at: string | null
          group_id: number | null
          hours: number | null
          id: string
          legacy_id: number | null
          level: string | null
          session_date: string | null
          session_name: string | null
          teacher_id: number | null
          teacher_lateness: number | null
          time_from: number | null
          time_to: number | null
        }
        Insert: {
          created_at?: string | null
          group_id?: number | null
          hours?: number | null
          id?: string
          legacy_id?: number | null
          level?: string | null
          session_date?: string | null
          session_name?: string | null
          teacher_id?: number | null
          teacher_lateness?: number | null
          time_from?: number | null
          time_to?: number | null
        }
        Update: {
          created_at?: string | null
          group_id?: number | null
          hours?: number | null
          id?: string
          legacy_id?: number | null
          level?: string | null
          session_date?: string | null
          session_name?: string | null
          teacher_id?: number | null
          teacher_lateness?: number | null
          time_from?: number | null
          time_to?: number | null
        }
        Relationships: []
      }
      school_students: {
        Row: {
          access_method: string | null
          address: string | null
          birth_date: string | null
          created_at: string | null
          email: string | null
          email_subscription: boolean | null
          fees: number | null
          group_id: number | null
          id: string
          membership: string | null
          name: string
          notes: string | null
          other_interests: string | null
          paid_fees: number | null
          phone_number: string | null
          placement_test_result: string | null
          preferred_activity: string | null
          preferred_time: string | null
          reference_number: string | null
          remaining_fees: number | null
          reservation_date: string | null
          status: string | null
          student_id_legacy: number | null
          student_number: number | null
          whatsapp: string | null
          whatsapp_subscription: boolean | null
        }
        Insert: {
          access_method?: string | null
          address?: string | null
          birth_date?: string | null
          created_at?: string | null
          email?: string | null
          email_subscription?: boolean | null
          fees?: number | null
          group_id?: number | null
          id?: string
          membership?: string | null
          name: string
          notes?: string | null
          other_interests?: string | null
          paid_fees?: number | null
          phone_number?: string | null
          placement_test_result?: string | null
          preferred_activity?: string | null
          preferred_time?: string | null
          reference_number?: string | null
          remaining_fees?: number | null
          reservation_date?: string | null
          status?: string | null
          student_id_legacy?: number | null
          student_number?: number | null
          whatsapp?: string | null
          whatsapp_subscription?: boolean | null
        }
        Update: {
          access_method?: string | null
          address?: string | null
          birth_date?: string | null
          created_at?: string | null
          email?: string | null
          email_subscription?: boolean | null
          fees?: number | null
          group_id?: number | null
          id?: string
          membership?: string | null
          name?: string
          notes?: string | null
          other_interests?: string | null
          paid_fees?: number | null
          phone_number?: string | null
          placement_test_result?: string | null
          preferred_activity?: string | null
          preferred_time?: string | null
          reference_number?: string | null
          remaining_fees?: number | null
          reservation_date?: string | null
          status?: string | null
          student_id_legacy?: number | null
          student_number?: number | null
          whatsapp?: string | null
          whatsapp_subscription?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_xp: {
        Row: {
          created_at: string
          current_streak: number
          id: string
          last_activity_date: string | null
          longest_streak: number
          total_xp: number
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number
          id?: string
          last_activity_date?: string | null
          longest_streak?: number
          total_xp?: number
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number
          id?: string
          last_activity_date?: string | null
          longest_streak?: number
          total_xp?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student" | "teacher" | "secretary"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student", "teacher", "secretary"],
    },
  },
} as const
