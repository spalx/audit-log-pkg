"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_pkg_1 = require("kafka-pkg");
const audit_log_dto_1 = require("../types/audit-log.dto");
const constants_1 = require("../common/constants");
class AuditLogService {
    constructor() {
        this.correlatedKafkaRequest = null;
    }
    async init() {
        if (!this.correlatedKafkaRequest) {
            this.correlatedKafkaRequest = new kafka_pkg_1.CorrelatedKafkaRequest(constants_1.AuditLogKafkaTopic.CreateLog);
        }
    }
    async createLog(data) {
        if (!this.correlatedKafkaRequest) {
            throw new Error('Audit log service not initialized');
        }
        audit_log_dto_1.CreateLogDTOSchema.parse(data.data);
        return await this.correlatedKafkaRequest.send(data);
    }
}
exports.default = new AuditLogService();
