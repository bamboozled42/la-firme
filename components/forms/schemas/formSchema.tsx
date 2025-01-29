// src/schemas/formSchemas.ts
import { z } from "zod";

// General Form Schema
export const generalFormSchema = z.object({
  name: z.string().min(1, { message: "nameRequired" }),
  number: z
    .number({ required_error: "numberRequired" })
    .int("numberInteger")
    .positive("numberPositive")
    .nullable()
    .optional(),
  floor_id: z.number({ required_error: "numberRequired" }).int("numberInteger").positive("numberPositive"),
});

export const wallFormSchema = generalFormSchema.extend({
  direction: z.enum(["X", "Y"], {
    errorMap: () => ({ message: "directionXY" }),
  }),
});

export const wallDetailsFormSchema = z.object({
  length: z
    .number({ required_error: "lengthRequired", invalid_type_error: "lengthRequired" })
    .positive("lengthPositive"),
  width: z.number({ required_error: "widthRequired", invalid_type_error: "widthRequired" }).positive("widthPositive"),
  height: z
    .number({ required_error: "heightRequired", invalid_type_error: "heightRequired" })
    .positive("heightPositive"),
  window_size_x: z
    .number({ required_error: "windowSizeRequired", invalid_type_error: "windowSizeRequired" })
    .positive("windowSizePositive"),
  window_size_y: z
    .number({ required_error: "windowSizeRequired", invalid_type_error: "windowSizeRequired" })
    .positive("windowSizePositive"),
  material: z.enum(["KK", "P", "C", "Drywall"], {
    errorMap: () => ({ message: "materialRequired" }),
  }),
  height_type: z.enum(["High", "Low"], {
    errorMap: () => ({ message: "highLowHeightRequired" }),
  }),
  location: z.enum(["Perimeter", "Internal"], {
    errorMap: () => ({ message: "locationRequired" }),
  }),
  stucco: z.enum(["Only inside", "Only outside", "Inside and outside", "No stucco"], {
    errorMap: () => ({ message: "stuccoRequired" }),
  }),
  wallRepeatFloors: z.boolean().default(false),
  fh1CrackInBeam: z.boolean().default(false),
  fh2CrackInWallCeiling: z.boolean().default(false),
  fh3CrackInCeiling: z.boolean().default(false),
  fv1VerticalCrackColumnWall: z.boolean().default(false),
  fv2VerticalCrackColumn: z.boolean().default(false),
  l1IrregularBrick: z.boolean().default(false),
  l2BricksWithExcessiveHoles: z.boolean().default(false),
  l3WallsNotWellAligned: z.boolean().default(false),
  l4IncompleteMortarInBrick: z.boolean().default(false),
  l5VariationInThicknessJoints: z.boolean().default(false),
  l6MortarJointsTooThick: z.boolean().default(false),
  l7PoorAdhesion: z.boolean().default(false),
  columnsAtEnds: z.boolean().default(false),
  perforatingColumn: z.boolean().default(false),
  perforatingBeam: z.boolean().default(false),
  notes: z.string().optional(),
});

export const columnFormSchema = generalFormSchema;

export const columnDetailsFormSchema = z.object({
  length: z
    .number({ required_error: "lengthRequired", invalid_type_error: "lengthRequired" })
    .positive("lengthPositive"),
  width: z.number({ required_error: "widthRequired", invalid_type_error: "widthRequired" }).positive("widthPositive"),
  height: z
    .number({ required_error: "heightRequired", invalid_type_error: "heightRequired" })
    .positive("heightPositive"),
  condition: z.enum(["Bad", "Good"], {
    errorMap: () => ({ message: "conditionRequired" }),
  }),
  type: z.enum(["Bracing column", "Independent column"], {
    errorMap: () => ({ message: "typeRequired" }),
  }),
  vertical_cracks: z.boolean().default(false),
  pipes: z.boolean().default(false),
});

export const beamFormSchema = generalFormSchema;

export const beamDetailsFormSchema = z.object({
  length: z
    .number({ required_error: "lengthRequired", invalid_type_error: "lengthRequired" })
    .positive("lengthPositive"),
  width: z.number({ required_error: "widthRequired", invalid_type_error: "widthRequired" }).positive("widthPositive"),
  height: z
    .number({ required_error: "heightRequired", invalid_type_error: "heightRequired" })
    .positive("heightPositive"),
  support_left_side: z.enum(["Column", "Wall", "Beam", "Overhanging"], {
    errorMap: () => ({ message: "supportLeftRequired" }),
  }),
  support_right_side: z.enum(["Column", "Wall", "Beam", "Overhanging"], {
    errorMap: () => ({ message: "supportRightRequired" }),
  }),
  type: z.enum(["Curved sole", "Flat sole", "Inverted Sole", "Curved", "Flat", "Inverted"], {
    errorMap: () => ({ message: "typeRequired" }),
  }),
  condition: z.enum(["Bad", "Good"], {
    errorMap: () => ({ message: "conditionRequired" }),
  }),
});

export const ceilingFormSchema = generalFormSchema;

export const ceilingDetailsFormSchema = z.object({
  height: z
    .number({ required_error: "heightRequired", invalid_type_error: "heightRequired" })
    .positive("heightPositive"),
  dimension_x: z
    .number({ required_error: "dimXRequired", invalid_type_error: "dimXRequired" })
    .positive("dimXPositive"),
  dimension_y: z
    .number({ required_error: "dimYRequired", invalid_type_error: "dimYRequired" })
    .positive("dimYPositive"),
  direction_of_joints: z.enum(["X", "Y"], {
    errorMap: () => ({ message: "jointDirectionRequired" }),
  }),
  cracks: z.boolean().default(false),
  pipes: z.boolean().default(false),
});

export const floorFormSchema = z.object({
  name: z.string().min(1, { message: "nameRequired" }),
});

export const floorDetailsFormSchema = z.object({
  materials: z.enum(["Dirt", "Cement", "Wood", "Tiles"], {
    errorMap: () => ({ message: "materialRequired" }),
  }),
});

export const projectFormSchema = z.object({
  title: z.string().min(1, "titleRequired"),
  location: z.string().min(1, "locationRequired"),
  start_date: z
    .string()
    .min(1, "startDateRequired")
    .transform((date) => new Date(date)),
  architect_id: z.string().min(1, "architectRequired"),
  client: z.string().min(1, "clientRequired"),
  status: z.string().min(1, "statusRequired"),
  description: z.string().optional(),
});

// TypeScript Types
export type GeneralFormSchema = z.infer<typeof generalFormSchema>;
export type WallFormSchema = z.infer<typeof wallFormSchema>;
export type WallDetailsFormSchema = z.infer<typeof wallDetailsFormSchema>;
export type ColumnFormSchema = z.infer<typeof columnFormSchema>;
export type ColumnDetailsFormSchema = z.infer<typeof columnDetailsFormSchema>;
export type BeamFormSchema = z.infer<typeof beamFormSchema>;
export type BeamDetailsFormSchema = z.infer<typeof beamDetailsFormSchema>;
export type CeilingFormSchema = z.infer<typeof ceilingFormSchema>;
export type CeilingDetailsFormSchema = z.infer<typeof ceilingDetailsFormSchema>;
export type FloorFormSchema = z.infer<typeof floorFormSchema>;
export type FloorDetailsFormSchema = z.infer<typeof floorDetailsFormSchema>;
