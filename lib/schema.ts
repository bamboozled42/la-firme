export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      beams: {
        Row: {
          beams_project_id: number | null;
          condition: string | null;
          floor_id: number | null;
          height: number | null;
          id: number;
          length: number | null;
          name: string | null;
          support_left_side: string | null;
          support_right_side: string | null;
        };
        Insert: {
          beams_project_id?: number | null;
          condition?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          length?: number | null;
          name?: string | null;
          support_left_side?: string | null;
          support_right_side?: string | null;
        };
        Update: {
          beams_project_id?: number | null;
          condition?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          length?: number | null;
          name?: string | null;
          support_left_side?: string | null;
          support_right_side?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "beams_beams_project_id_fkey";
            columns: ["beams_project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "beams_floor_id_fkey";
            columns: ["floor_id"];
            isOneToOne: false;
            referencedRelation: "floors";
            referencedColumns: ["id"];
          },
        ];
      };
      ceilings: {
        Row: {
          ceilings_project_id: number | null;
          cracks: string | null;
          dimension_x: number | null;
          dimension_y: number | null;
          direction_of_joints: string | null;
          floor_id: number | null;
          height: number | null;
          id: number;
          name: string;
          pipes: string | null;
        };
        Insert: {
          ceilings_project_id?: number | null;
          cracks?: string | null;
          dimension_x?: number | null;
          dimension_y?: number | null;
          direction_of_joints?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          name: string;
          pipes?: string | null;
        };
        Update: {
          ceilings_project_id?: number | null;
          cracks?: string | null;
          dimension_x?: number | null;
          dimension_y?: number | null;
          direction_of_joints?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          name?: string;
          pipes?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ceilings_ceilings_project_id_fkey";
            columns: ["ceilings_project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ceilings_floor_id_fkey";
            columns: ["floor_id"];
            isOneToOne: false;
            referencedRelation: "floors";
            referencedColumns: ["id"];
          },
        ];
      };
      columns: {
        Row: {
          columns_project_id: number | null;
          condition: string | null;
          floor_id: number | null;
          height: number | null;
          id: number;
          length: number | null;
          name: string | null;
          notes: string | null;
          pipes: string | null;
          vertical_cracks: string | null;
          width: number | null;
        };
        Insert: {
          columns_project_id?: number | null;
          condition?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          length?: number | null;
          name?: string | null;
          notes?: string | null;
          pipes?: string | null;
          vertical_cracks?: string | null;
          width?: number | null;
        };
        Update: {
          columns_project_id?: number | null;
          condition?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          length?: number | null;
          name?: string | null;
          notes?: string | null;
          pipes?: string | null;
          vertical_cracks?: string | null;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "columns_columns_project_id_fkey";
            columns: ["columns_project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "columns_floor_id_fkey";
            columns: ["floor_id"];
            isOneToOne: false;
            referencedRelation: "floors";
            referencedColumns: ["id"];
          },
        ];
      };
      floors: {
        Row: {
          floors_project_id: number;
          id: number;
          materials: string | null;
          name: string;
        };
        Insert: {
          floors_project_id: number;
          id?: number;
          materials?: string | null;
          name: string;
        };
        Update: {
          floors_project_id?: number;
          id?: number;
          materials?: string | null;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "floors_floors_project_id_fkey";
            columns: ["floors_project_id"];
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
          architect_id: string | null;
          client: string;
          description: string;
          id: number;
          location: string;
          start_date: string;
          status: string;
          title: string;
        };
        Insert: {
          architect_id?: string | null;
          client: string;
          description: string;
          id?: number;
          location: string;
          start_date: string;
          status: string;
          title: string;
        };
        Update: {
          architect_id?: string | null;
          client?: string;
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
        ];
      };
      tags: {
        Row: {
          id: number;
          tag: string | null;
          tags_project_id: number | null;
        };
        Insert: {
          id?: number;
          tag?: string | null;
          tags_project_id?: number | null;
        };
        Update: {
          id?: number;
          tag?: string | null;
          tags_project_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "tags_tags_project_id_fkey";
            columns: ["tags_project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          email: string | null;
          first_name: string;
          id: string;
          last_name: string;
          password: string;
          role: string | null;
        };
        Insert: {
          email?: string | null;
          first_name: string;
          id?: string;
          last_name: string;
          password: string;
          role?: string | null;
        };
        Update: {
          email?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          password?: string;
          role?: string | null;
        };
        Relationships: [];
      };
      walls: {
        Row: {
          condition_of_bricks_cement: string | null;
          cracks: string | null;
          direction: string;
          floor_id: number | null;
          height: number | null;
          height_type: string | null;
          horizontal_crack_ceilng: boolean | null;
          horizontal_crack_in_beam: string | null;
          horizontal_crack_wall_ceiling: string | null;
          id: number;
          length: number | null;
          location: string | null;
          material: string | null;
          name: string;
          stucco: string | null;
          vertical_crack_column: string | null;
          vertical_crack_column_wall: string | null;
          walls_project_id: number | null;
          width: number | null;
          window_size_x: number | null;
          window_size_y: number | null;
        };
        Insert: {
          condition_of_bricks_cement?: string | null;
          cracks?: string | null;
          direction: string;
          floor_id?: number | null;
          height?: number | null;
          height_type?: string | null;
          horizontal_crack_ceilng?: boolean | null;
          horizontal_crack_in_beam?: string | null;
          horizontal_crack_wall_ceiling?: string | null;
          id?: number;
          length?: number | null;
          location?: string | null;
          material?: string | null;
          name: string;
          stucco?: string | null;
          vertical_crack_column?: string | null;
          vertical_crack_column_wall?: string | null;
          walls_project_id?: number | null;
          width?: number | null;
          window_size_x?: number | null;
          window_size_y?: number | null;
        };
        Update: {
          condition_of_bricks_cement?: string | null;
          cracks?: string | null;
          direction?: string;
          floor_id?: number | null;
          height?: number | null;
          height_type?: string | null;
          horizontal_crack_ceilng?: boolean | null;
          horizontal_crack_in_beam?: string | null;
          horizontal_crack_wall_ceiling?: string | null;
          id?: number;
          length?: number | null;
          location?: string | null;
          material?: string | null;
          name?: string;
          stucco?: string | null;
          vertical_crack_column?: string | null;
          vertical_crack_column_wall?: string | null;
          walls_project_id?: number | null;
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
            foreignKeyName: "walls_walls_project_id_fkey";
            columns: ["walls_project_id"];
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
