export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      exercises: {
        Row: {
          category: string
          equipment: string | null
          id: number
          instructions: string[]
          name: string
          primaryMuscles: string[]
        }
        Insert: {
          category: string
          equipment?: string | null
          id?: number
          instructions: string[]
          name: string
          primaryMuscles: string[]
        }
        Update: {
          category?: string
          equipment?: string | null
          id?: number
          instructions?: string[]
          name?: string
          primaryMuscles?: string[]
        }
        Relationships: []
      }
      following: {
        Row: {
          following_user_id: number
          user_id: number
        }
        Insert: {
          following_user_id: number
          user_id: number
        }
        Update: {
          following_user_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_following_user"
            columns: ["following_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stats: {
        Row: {
          bench: number | null
          deadlift: number | null
          id: number
          recordedworkouts: Json | null
          squat: number | null
        }
        Insert: {
          bench?: number | null
          deadlift?: number | null
          id?: number
          recordedworkouts?: Json | null
          squat?: number | null
        }
        Update: {
          bench?: number | null
          deadlift?: number | null
          id?: number
          recordedworkouts?: Json | null
          squat?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          admin: boolean | null
          biography: string | null
          dob: string | null
          email: string
          firstname: string | null
          id: number
          lastname: string | null
          password: string
          photo: string | null
          stats_id: number | null
          username: string
        }
        Insert: {
          admin?: boolean | null
          biography?: string | null
          dob?: string | null
          email: string
          firstname?: string | null
          id?: number
          lastname?: string | null
          password: string
          photo?: string | null
          stats_id?: number | null
          username: string
        }
        Update: {
          admin?: boolean | null
          biography?: string | null
          dob?: string | null
          email?: string
          firstname?: string | null
          id?: number
          lastname?: string | null
          password?: string
          photo?: string | null
          stats_id?: number | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_stats"
            columns: ["stats_id"]
            isOneToOne: false
            referencedRelation: "stats"
            referencedColumns: ["id"]
          },
        ]
      }
      workoutexercises: {
        Row: {
          exercise_id: number
          reps: number | null
          workout_id: number
        }
        Insert: {
          exercise_id: number
          reps?: number | null
          workout_id: number
        }
        Update: {
          exercise_id?: number
          reps?: number | null
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_exercise"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_workout"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          id: number
          name: string | null
          sets: number | null
          user_id: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          sets?: number | null
          user_id?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          sets?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
