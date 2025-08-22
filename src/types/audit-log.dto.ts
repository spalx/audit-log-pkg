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
