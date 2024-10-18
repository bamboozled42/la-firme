export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      beams: {
        Row: {
          condition: string | null;
          floor_id: number | null;
          height: number | null;
          hoizontal_cracks: boolean | null;
          id: number;
          length: number | null;
          name: string | null;
          pipes: boolean | null;
          project_id: number | null;
        };
        Insert: {
          condition?: string | null;
          floor_id?: number | null;
          height?: number | null;
          hoizontal_cracks?: boolean | null;
          id?: number;
          length?: number | null;
          name?: string | null;
          pipes?: boolean | null;
          project_id?: number | null;
        };
        Update: {
          condition?: string | null;
          floor_id?: number | null;
          height?: number | null;
          hoizontal_cracks?: boolean | null;
          id?: number;
          length?: number | null;
          name?: string | null;
          pipes?: boolean | null;
          project_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "beams_floor_id_fkey";
            columns: ["floor_id"];
            isOneToOne: false;
            referencedRelation: "floors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "beams_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      ceilings: {
        Row: {
          cracks: boolean | null;
          dimension_x: number | null;
          dimension_y: number | null;
          floor_id: number | null;
          id: number;
          pipes: boolean | null;
          project_id: number | null;
        };
        Insert: {
          cracks?: boolean | null;
          dimension_x?: number | null;
          dimension_y?: number | null;
          floor_id?: number | null;
          id?: number;
          pipes?: boolean | null;
          project_id?: number | null;
        };
        Update: {
          cracks?: boolean | null;
          dimension_x?: number | null;
          dimension_y?: number | null;
          floor_id?: number | null;
          id?: number;
          pipes?: boolean | null;
          project_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "ceilings_floor_id_fkey";
            columns: ["floor_id"];
            isOneToOne: false;
            referencedRelation: "floors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ceilings_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      columns: {
        Row: {
          condition: string | null;
          floor_id: number | null;
          height: number | null;
          id: number;
          length: number | null;
          name: string | null;
          notes: string | null;
          pipes: boolean | null;
          project_id: number | null;
          vertical_cracks: boolean | null;
          width: number | null;
        };
        Insert: {
          condition?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          length?: number | null;
          name?: string | null;
          notes?: string | null;
          pipes?: boolean | null;
          project_id?: number | null;
          vertical_cracks?: boolean | null;
          width?: number | null;
        };
        Update: {
          condition?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          length?: number | null;
          name?: string | null;
          notes?: string | null;
          pipes?: boolean | null;
          project_id?: number | null;
          vertical_cracks?: boolean | null;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "columns_floor_id_fkey";
            columns: ["floor_id"];
            isOneToOne: false;
            referencedRelation: "floors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "columns_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      floors: {
        Row: {
          floor_level: number | null;
          id: number;
          materials: string | null;
          project_id: number | null;
        };
        Insert: {
          floor_level?: number | null;
          id?: number;
          materials?: string | null;
          project_id?: number | null;
        };
        Update: {
          floor_level?: number | null;
          id?: number;
          materials?: string | null;
          project_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "floors_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          biography: string | null;
          display_name: string;
          email: string;
          id: string;
        };
        Insert: {
          biography?: string | null;
          display_name: string;
          email: string;
          id: string;
        };
        Update: {
          biography?: string | null;
          display_name?: string;
          email?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          architect_id: number;
          client_id: number;
          description: string;
          id: number;
          location: string;
          start_date: string;
          status: string;
          title: string;
        };
        Insert: {
          architect_id: number;
          client_id: number;
          description: string;
          id?: number;
          location: string;
          start_date: string;
          status: string;
          title: string;
        };
        Update: {
          architect_id?: number;
          client_id?: number;
          description?: string;
          id?: number;
          location?: string;
          start_date?: string;
          status?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_architect_id_fkey";
            columns: ["architect_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tags: {
        Row: {
          id: number;
          project_id: number | null;
          tag: string | null;
        };
        Insert: {
          id?: number;
          project_id?: number | null;
          tag?: string | null;
        };
        Update: {
          id?: number;
          project_id?: number | null;
          tag?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tags_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          email: string;
          first_name: string;
          id: number;
          last_name: string;
          password: string;
          role: string | null;
        };
        Insert: {
          email: string;
          first_name: string;
          id?: number;
          last_name: string;
          password: string;
          role?: string | null;
        };
        Update: {
          email?: string;
          first_name?: string;
          id?: number;
          last_name?: string;
          password?: string;
          role?: string | null;
        };
        Relationships: [];
      };
      walls: {
        Row: {
          floor_id: number | null;
          height: number | null;
          height_type: string | null;
          id: number;
          length: number | null;
          location: string | null;
          material: string | null;
          name: string | null;
          project_id: number | null;
          stucco: boolean | null;
          width: number | null;
          window_size_x: number | null;
          window_size_y: number | null;
        };
        Insert: {
          floor_id?: number | null;
          height?: number | null;
          height_type?: string | null;
          id?: number;
          length?: number | null;
          location?: string | null;
          material?: string | null;
          name?: string | null;
          project_id?: number | null;
          stucco?: boolean | null;
          width?: number | null;
          window_size_x?: number | null;
          window_size_y?: number | null;
        };
        Update: {
          floor_id?: number | null;
          height?: number | null;
          height_type?: string | null;
          id?: number;
          length?: number | null;
          location?: string | null;
          material?: string | null;
          name?: string | null;
          project_id?: number | null;
          stucco?: boolean | null;
          width?: number | null;
          window_size_x?: number | null;
          window_size_y?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "walls_floor_id_fkey";
            columns: ["floor_id"];
            isOneToOne: false;
            referencedRelation: "floors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "walls_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
