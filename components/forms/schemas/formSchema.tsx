// src/schemas/formSchemas.ts
import { z } from "zod";

// General Form Schema
export const generalFormSchema = z.object({
  name: z.string().optional(),
  number: z
    .number({ required_error: "Number is required" })
    .int("Number must be an integer")
    .positive("Number must be positive")
    .nullable()
    .optional(),
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
  material: z.string().min(1, "Material selection is required"),
  stucco: z.enum(["inside", "outside"], {
    errorMap: () => ({ message: "Stucco must be either 'inside' or 'outside'" }),
  }),
  cracks: z.string().min(1, "Cracks selection is required"),
});

export const columnFormSchema = generalFormSchema;

export const columnDetailsFormSchema = z.object({
  length: z.number({ required_error: "Length is required" }).positive("Length must be positive"),
  width: z.number({ required_error: "Width is required" }).positive("Width must be positive"),
  height: z.number({ required_error: "Height is required" }).positive("Height must be positive"),
  condition: z.enum(["Good", "Fair", "Poor"], {
    errorMap: () => ({ message: "Condition is required" }),
  }),
  verticalCracks: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Vertical cracks is required" }),
  }),
  pipes: z.number({ required_error: "Pipes is required" }).positive("Pipes must be positive"),
});

export const beamFormSchema = generalFormSchema;

export const beamDetailsFormSchema = z.object({
  length: z.number({ required_error: "Length is required" }).positive("Length must be positive"),
  width: z.number({ required_error: "Width is required" }).positive("Width must be positive"),
  height: z.number({ required_error: "Height is required" }).positive("Height must be positive"),
  supportLeftSide: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Support left side is required" }),
  }),
  supportRightSide: z.enum(["Yes", "No"], {
    errorMap: () => ({ message: "Support right side is required" }),
  }),
  condition: z.enum(["Good", "Fair", "Poor"], {
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
  pipes: z.number({ required_error: "Pipes is required" }).positive("Pipes must be positive"),
});

export const floorFormSchema = generalFormSchema;

export const floorDetailsFormSchema = z.object({
  materials: z.string().min(1, "Materials is required"),
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
