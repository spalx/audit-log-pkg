import { z } from 'zod';

export interface LogAuthor {
  id: string;
  name: string;
}

export interface LogDTO {
  author: LogAuthor;
  action: string;
  target_id?: string;
  date?: Date;
  meta?: Record<string, unknown>;
}

const LogAuthorSchema = z.object({
  id: z.string({
    required_error: 'id is required',
    invalid_type_error: 'id must be a string',
  }).min(1, 'id cannot be empty'),

  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a string',
  }).min(1, 'name cannot be empty'),
});

export const LogDTOSchema = z.object({
  author: LogAuthorSchema,

  action: z.string({
    required_error: 'action is required',
    invalid_type_error: 'action must be a string',
  }).min(1, 'action cannot be empty'),

  target_id: z.string({
    invalid_type_error: "target_id must be a string"
  }).optional().refine(val => val === undefined || val.trim() !== '', {
    message: "target_id cannot be empty",
  }),

  date: z.string({
    invalid_type_error: 'date must be a string',
  }).min(1, 'date cannot be empty').optional(),

  meta: z.record(z.unknown(), {
    invalid_type_error: 'meta must be an object with string keys',
  }).optional(),
});
