import { z } from 'zod';

export interface AuditLogAuthor {
  id: string;
  name: string;
}

export interface CreateLogDTO {
  client: string;
  author: AuditLogAuthor;
  action: string;
  date?: Date;
  meta?: Record<string, unknown>;
}

export interface DidCreateLogDTO {
}

const AuditLogAuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const CreateLogDTOSchema = z.object({
  client: z.string(),
  author: AuditLogAuthorSchema,
  action: z.string(),
  date: z.date().optional(),
  meta: z.object({}).optional(),
});
