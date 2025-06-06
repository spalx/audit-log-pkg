import { z } from 'zod';

export interface CreateLogDTO {
  client: string;
  author: string;
  date: Date;
  action: string;
  meta?: Record<string, unknown>;
}

export interface DidCreateLogDTO {
}

export const CreateLogDTOSchema = z.object({
  client: z.string(),
  author: z.string(),
  date: z.date(),
  action: z.string(),
  meta: z.object({}).optional(),
});
