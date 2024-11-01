// src/schemas/formSchemas.ts
import { z } from "zod";

// General Form Schema
export const generalFormSchema = z.object({
  name: z.string().optional(),
  number: z
    .number({ required_error: "Number is required" })
    .int("Number must be an integer")
    .positive("Number must be positive"),
  floor: z.string().min(1, "Floor selection is required"),
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
  sizeOfWindowX: z.number({ required_error: "Size of window is required" }).positive("Size of window must be positive"),
  sizeOfWindowY: z.number({ required_error: "Size of window is required" }).positive("Size of window must be positive"),
  material: z.enum(["KK", "P", "C", "Drywall", "Seleccionar"], {
    errorMap: () => ({ message: "Material is required" }),
  }),
  fullOrPartialHeight: z.enum(["High", "Low"], {
    errorMap: () => ({ message: "High or low height is required" }),
  }),
  wallRepeatFloors: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Wall repeat floors is required" }),
  }),
  location: z.enum(["Perimeter", "Internal"], {
    errorMap: () => ({ message: "Location is required" }),
  }),
  stucco: z.enum(["Only inside", "Only outside", "Inside and outside", "No stucco"], {
    errorMap: () => ({ message: "Stucco must be selected" }),
  }),
  fh1CrackInBeam: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "FH1 crack in beam is required" }),
  }),
  fh2CrackInWallCeiling: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "FH2 crack in wall ceiling is required" }),
  }),
  fh3CrackInCeiling: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "FH3 crack in ceiling is required" }),
  }),
  fh4CrackInCeiling: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "FH4 crack in ceiling is required" }),
  }),
  fv1VerticalCrackColumnWall: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "FV1 vertical crack column wall is required" }),
  }),
  fv2VerticalCrackColumn: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "FV2 vertical crack column is required" }),
  }),
  l1IrregularBrick: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "L1 irregular brick is required" }),
  }),
  l2BricksWithExcessiveHoles: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "L2 bricks with excessive holes is required" }),
  }),
  l3WallsNotWellAligned: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "L3 walls not well aligned is required" }),
  }),
  l4IncompleteMortarInBrick: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "L4 incomplete mortar in brick is required" }),
  }),
  l5VariationInThicknessJoints: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "L5 variation in thickness joints is required" }),
  }),
  l6MortarJointsTooThick: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "L6 mortar joints too thick is required" }),
  }),
  l7PoorAdhesion: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "L7 poor adhesion is required" }),
  }),
  perforatingColumn: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Perforating column is required" }),
  }),
  perforatingBeam: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Perforating beam is required" }),
  }),
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
  verticalCracks: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Vertical cracks is required" }),
  }),
  pipes: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Pipes is required" }),
  }),
});

export const beamFormSchema = generalFormSchema;

export const beamDetailsFormSchema = z.object({
  length: z.number({ required_error: "Length is required" }).positive("Length must be positive"),
  width: z.number({ required_error: "Width is required" }).positive("Width must be positive"),
  height: z.number({ required_error: "Height is required" }).positive("Height must be positive"),
  supportLeftSide: z.enum(["Column", "Wall", "Beam", "Overhanging"], {
    errorMap: () => ({ message: "Support left side is required" }),
  }),
  supportRightSide: z.enum(["Column", "Wall", "Beam", "Overhanging"], {
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
  dimensionX: z.number({ required_error: "Dimension X is required" }).positive("Dimension X must be positive"),
  dimensionY: z.number({ required_error: "Dimension Y is required" }).positive("Dimension Y must be positive"),
  directionOfJoints: z.enum(["X", "Y"], {
    errorMap: () => ({ message: "Direction of joints is required" }),
  }),
  cracks: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Cracks is required" }),
  }),
  pipes: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Pipes is required" }),
  }),
});

export const floorFormSchema = generalFormSchema;

export const floorDetailsFormSchema = z.object({
  materials: z.enum(["Dirt", "Cement", "Wood", "Tiles"], {
    errorMap: () => ({ message: "Material is required" }),
  }),
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
