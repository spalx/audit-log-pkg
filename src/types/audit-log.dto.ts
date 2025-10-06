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
  id: z.string('id must be a string').min(1, 'id cannot be empty'),
  name: z.string('name must be a string').min(1, 'name cannot be empty'),
});

export const LogDTOSchema = z.object({
  author: LogAuthorSchema,
  action: z.string('action must be a string').min(1, 'action cannot be empty'),
  target_id: z.string('target_id must be a string').optional(),
  date: z.iso.date('date must be a date').optional(),
  meta: z.record(z.string(), z.unknown(), 'meta must be an object with string keys').optional(),
});
