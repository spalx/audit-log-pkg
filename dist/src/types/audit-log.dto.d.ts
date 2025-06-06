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
export declare const CreateLogDTOSchema: z.ZodObject<{
    client: z.ZodString;
    author: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>;
    action: z.ZodString;
    date: z.ZodOptional<z.ZodDate>;
    meta: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    client: string;
    author: {
        id: string;
        name: string;
    };
    action: string;
    date?: Date | undefined;
    meta?: {} | undefined;
}, {
    client: string;
    author: {
        id: string;
        name: string;
    };
    action: string;
    date?: Date | undefined;
    meta?: {} | undefined;
}>;
