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
export declare const CreateLogDTOSchema: z.ZodObject<{
    client: z.ZodString;
    author: z.ZodString;
    date: z.ZodDate;
    action: z.ZodString;
    meta: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    client: string;
    author: string;
    date: Date;
    action: string;
    meta?: {} | undefined;
}, {
    client: string;
    author: string;
    date: Date;
    action: string;
    meta?: {} | undefined;
}>;
