"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLogDTOSchema = void 0;
const zod_1 = require("zod");
const AuditLogAuthorSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
});
exports.CreateLogDTOSchema = zod_1.z.object({
    client: zod_1.z.string(),
    author: AuditLogAuthorSchema,
    action: zod_1.z.string(),
    date: zod_1.z.date().optional(),
    meta: zod_1.z.object({}).optional(),
});
