export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      beams: {
        Row: {
          condition: string | null;
          floor_id: number | null;
          height: number | null;
          id: number;
          length: number | null;
          name: string | null;
          projectId: number | null;
          support_left_side: string | null;
          support_right_side: string | null;
          type: string | null;
          width: number | null;
        };
        Insert: {
          condition?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          length?: number | null;
          name?: string | null;
          projectId?: number | null;
          support_left_side?: string | null;
          support_right_side?: string | null;
          type?: string | null;
          width?: number | null;
        };
        Update: {
          condition?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          length?: number | null;
          name?: string | null;
          projectId?: number | null;
          support_left_side?: string | null;
          support_right_side?: string | null;
          type?: string | null;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "beams_floor_id_fkey";
            columns: ["floor_id"];
            isOneToOne: false;
            referencedRelation: "floors";
            referencedColumns: ["floor_id"];
          },
          {
            foreignKeyName: "beams_projectId_fkey";
            columns: ["projectId"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      ceilings: {
        Row: {
          cracks: string | null;
          dimension_x: number | null;
          dimension_y: number | null;
          direction_of_joints: string | null;
          floor_id: number | null;
          height: number | null;
          id: number;
          name: string;
          pipes: string | null;
          projectId: number | null;
        };
        Insert: {
          cracks?: string | null;
          dimension_x?: number | null;
          dimension_y?: number | null;
          direction_of_joints?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          name: string;
          pipes?: string | null;
          projectId?: number | null;
        };
        Update: {
          cracks?: string | null;
          dimension_x?: number | null;
          dimension_y?: number | null;
          direction_of_joints?: string | null;
          floor_id?: number | null;
          height?: number | null;
          id?: number;
          name?: string;
          pipes?: string | null;
          projectId?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "ceilings_floor_id_fkey";
            columns: ["floor_id"];
            isOneToOne: false;
            referencedRelation: "floors";
            referencedColumns: ["floor_id"];
          },
          {
            foreignKeyName: "ceilings_projectId_fkey";
            columns: ["projectId"];
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
          projectId: number | null;
          type: string | null;
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
          projectId?: number | null;
          type?: string | null;
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
          projectId?: number | null;
          type?: string | null;
          vertical_cracks?: boolean | null;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "columns_floor_id_fkey";
            columns: ["floor_id"];
            isOneToOne: false;
            referencedRelation: "floors";
            referencedColumns: ["floor_id"];
          },
          {
            foreignKeyName: "columns_projectId_fkey";
            columns: ["projectId"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      floors: {
        Row: {
          floor_id: number;
          floor_plan: string | null;
          materials: string | null;
          name: string;
          projectId: number;
        };
        Insert: {
          floor_id?: number;
          floor_plan?: string | null;
          materials?: string | null;
          name: string;
          projectId: number;
        };
        Update: {
          floor_id?: number;
          floor_plan?: string | null;
          materials?: string | null;
          name?: string;
          projectId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "floors_projectId_fkey";
            columns: ["projectId"];
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
        Relationships: [];
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
          role: string | null;
        };
        Insert: {
          email?: string | null;
          first_name: string;
          id?: string;
          last_name: string;
          role?: string | null;
        };
        Update: {
          email?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          role?: string | null;
        };
        Relationships: [];
      };
      walls: {
        Row: {
          direction: string;
          fh1CrackInBeam: boolean | null;
          fh2CrackInWallCeiling: boolean | null;
          fh3CrackInCeiling: boolean | null;
          fh4CrackInCeiling: boolean | null;
          floor_id: number | null;
          fv1VerticalCrackColumnWall: boolean | null;
          fv2VerticalCrackColumn: boolean | null;
          height: number | null;
          height_type: string | null;
          id: number;
          l1IrregularBrick: boolean | null;
          l2BricksWithExcessiveHoles: boolean | null;
          l3WallsNotWellAligned: boolean | null;
          l4IncompleteMortarInBrick: boolean | null;
          l5VariationInThicknessJoints: boolean | null;
          l6MortarJointsTooThick: boolean | null;
          l7PoorAdhesion: boolean | null;
          length: number | null;
          location: string | null;
          material: string | null;
          name: string;
          perforatingBeam: boolean | null;
          perforatingColumn: boolean | null;
          projectId: number | null;
          stucco: string | null;
          wallRepeatFloors: boolean | null;
          width: number | null;
          window_size_x: number | null;
          window_size_y: number | null;
        };
        Insert: {
          direction: string;
          fh1CrackInBeam?: boolean | null;
          fh2CrackInWallCeiling?: boolean | null;
          fh3CrackInCeiling?: boolean | null;
          fh4CrackInCeiling?: boolean | null;
          floor_id?: number | null;
          fv1VerticalCrackColumnWall?: boolean | null;
          fv2VerticalCrackColumn?: boolean | null;
          height?: number | null;
          height_type?: string | null;
          id?: number;
          l1IrregularBrick?: boolean | null;
          l2BricksWithExcessiveHoles?: boolean | null;
          l3WallsNotWellAligned?: boolean | null;
          l4IncompleteMortarInBrick?: boolean | null;
          l5VariationInThicknessJoints?: boolean | null;
          l6MortarJointsTooThick?: boolean | null;
          l7PoorAdhesion?: boolean | null;
          length?: number | null;
          location?: string | null;
          material?: string | null;
          name: string;
          perforatingBeam?: boolean | null;
          perforatingColumn?: boolean | null;
          projectId?: number | null;
          stucco?: string | null;
          wallRepeatFloors?: boolean | null;
          width?: number | null;
          window_size_x?: number | null;
          window_size_y?: number | null;
        };
        Update: {
          direction?: string;
          fh1CrackInBeam?: boolean | null;
          fh2CrackInWallCeiling?: boolean | null;
          fh3CrackInCeiling?: boolean | null;
          fh4CrackInCeiling?: boolean | null;
          floor_id?: number | null;
          fv1VerticalCrackColumnWall?: boolean | null;
          fv2VerticalCrackColumn?: boolean | null;
          height?: number | null;
          height_type?: string | null;
          id?: number;
          l1IrregularBrick?: boolean | null;
          l2BricksWithExcessiveHoles?: boolean | null;
          l3WallsNotWellAligned?: boolean | null;
          l4IncompleteMortarInBrick?: boolean | null;
          l5VariationInThicknessJoints?: boolean | null;
          l6MortarJointsTooThick?: boolean | null;
          l7PoorAdhesion?: boolean | null;
          length?: number | null;
          location?: string | null;
          material?: string | null;
          name?: string;
          perforatingBeam?: boolean | null;
          perforatingColumn?: boolean | null;
          projectId?: number | null;
          stucco?: string | null;
          wallRepeatFloors?: boolean | null;
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
            referencedColumns: ["floor_id"];
          },
          {
            foreignKeyName: "walls_projectId_fkey";
            columns: ["projectId"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      whitelist_users: {
        Row: {
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          role: string;
        };
        Insert: {
          email: string;
          first_name: string;
          id?: string;
          last_name: string;
          role: string;
        };
        Update: {
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          role?: string;
        };
        Relationships: [];
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
