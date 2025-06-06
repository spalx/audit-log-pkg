"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLogDTOSchema = void 0;
const zod_1 = require("zod");
exports.CreateLogDTOSchema = zod_1.z.object({
    client: zod_1.z.string(),
    author: zod_1.z.string(),
    date: zod_1.z.date(),
    action: zod_1.z.string(),
    meta: zod_1.z.object({}).optional(),
});
