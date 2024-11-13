// src/schemas/formSchemas.ts
import { z } from "zod";

// General Form Schema
export const generalFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  number: z
    .number({ required_error: "Number is required" })
    .int("Number must be an integer")
    .positive("Number must be positive")
    .nullable()
    .optional(),
  floor_id: z
    .number({ required_error: "Number is required" })
    .int("Number must be an integer")
    .positive("Number must be positive"),
});

export const wallFormSchema = generalFormSchema.extend({
  direction: z.enum(["x", "y"], {
    errorMap: () => ({ message: "Direction must be either 'x' or 'y'" }),
  }),
});

export const wallDetailsFormSchema = z.object({
  length: z.number({ required_error: "Length is required" }).positive("Length must be positive"),
  width: z.number({ required_error: "Width is required" }).positive("Width must be positive"),
  height: z.number({ required_error: "Height is required" }).positive("Height must be positive"),
  window_size_x: z.number({ required_error: "Size of window is required" }).positive("Size of window must be positive"),
  window_size_y: z.number({ required_error: "Size of window is required" }).positive("Size of window must be positive"),
  material: z.enum(["KK", "P", "C", "Drywall", "Seleccionar"], {
    errorMap: () => ({ message: "Material is required" }),
  }),
  height_type: z.enum(["High", "Low"], {
    errorMap: () => ({ message: "High or low height is required" }),
  }),
  location: z.enum(["Perimeter", "Internal"], {
    errorMap: () => ({ message: "Location is required" }),
  }),
  stucco: z.enum(["Only inside", "Only outside", "Inside and outside", "No stucco"], {
    errorMap: () => ({ message: "Stucco must be selected" }),
  }),
  wallRepeatFloors: z.boolean().default(false),
  fh1CrackInBeam: z.boolean().default(false),
  fh2CrackInWallCeiling: z.boolean().default(false),
  fh3CrackInCeiling: z.boolean().default(false),
  fh4CrackInCeiling: z.boolean().default(false),
  fv1VerticalCrackColumnWall: z.boolean().default(false),
  fv2VerticalCrackColumn: z.boolean().default(false),
  l1IrregularBrick: z.boolean().default(false),
  l2BricksWithExcessiveHoles: z.boolean().default(false),
  l3WallsNotWellAligned: z.boolean().default(false),
  l4IncompleteMortarInBrick: z.boolean().default(false),
  l5VariationInThicknessJoints: z.boolean().default(false),
  l6MortarJointsTooThick: z.boolean().default(false),
  l7PoorAdhesion: z.boolean().default(false),
  perforatingColumn: z.boolean().default(false),
  perforatingBeam: z.boolean().default(false),
});

export const columnFormSchema = generalFormSchema;

export const columnDetailsFormSchema = z.object({
  length: z.number({ required_error: "Length is required" }).positive("Length must be positive"),
  width: z.number({ required_error: "Width is required" }).positive("Width must be positive"),
  height: z.number({ required_error: "Height is required" }).positive("Height must be positive"),
  condition: z.enum(["Seleccionar", "Bad", "Good"], {
    errorMap: () => ({ message: "Condition is required" }),
  }),
  type: z.enum(["Column of 'arriostramiento'", "Independent column"], {
    errorMap: () => ({ message: "Type is required" }),
  }),
  vertical_cracks: z.boolean().default(false),
  pipes: z.boolean().default(false),
});

export const beamFormSchema = generalFormSchema;

export const beamDetailsFormSchema = z.object({
  length: z.number({ required_error: "Length is required" }).positive("Length must be positive"),
  width: z.number({ required_error: "Width is required" }).positive("Width must be positive"),
  height: z.number({ required_error: "Height is required" }).positive("Height must be positive"),
  support_left_side: z.enum(["Column", "Wall", "Beam", "Overhanging"], {
    errorMap: () => ({ message: "Support left side is required" }),
  }),
  support_right_side: z.enum(["Column", "Wall", "Beam", "Overhanging"], {
    errorMap: () => ({ message: "Support right side is required" }),
  }),
  type: z.enum(["Curved sole", "Flat sole", "Inverted Sole", "Curved", "Flat", "Inverted"], {
    errorMap: () => ({ message: "Type is required" }),
  }),
  condition: z.enum(["Seleccionar", "Bad", "Good"], {
    errorMap: () => ({ message: "Condition is required" }),
  }),
});

export const ceilingFormSchema = generalFormSchema;

export const ceilingDetailsFormSchema = z.object({
  height: z.number({ required_error: "Height is required" }).positive("Height must be positive"),
  dimension_x: z.number({ required_error: "Dimension X is required" }).positive("Dimension X must be positive"),
  dimension_y: z.number({ required_error: "Dimension Y is required" }).positive("Dimension Y must be positive"),
  direction_of_joints: z.enum(["X", "Y"], {
    errorMap: () => ({ message: "Direction of joints is required" }),
  }),
  cracks: z.boolean().default(false),
  pipes: z.boolean().default(false),
});

export const floorFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export const floorDetailsFormSchema = z.object({
  materials: z.enum(["Dirt", "Cement", "Wood", "Tiles"], {
    errorMap: () => ({ message: "Material is required" }),
  }),
});

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  start_date: z
    .string()
    .min(1, "Start date is required")
    .transform((date) => new Date(date)),
  architect_id: z.string().min(1, "Architect is required"),
  client: z.string().min(1, "Client is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().min(1, "Description is required"),
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
