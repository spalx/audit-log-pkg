import {
  CorrelatedRequestDTO,
  CorrelatedResponseDTO,
  CorrelatedKafkaRequest
} from 'kafka-pkg';
import { IAppPkg } from 'app-life-cycle-pkg';

import { CreateLogDTO, DidCreateLogDTO, CreateLogDTOSchema } from '../types/audit-log.dto';
import { AuditLogKafkaTopic } from '../common/constants';

class AuditLogService implements IAppPkg {
  private correlatedKafkaRequest: CorrelatedKafkaRequest | null = null;

  async init(): Promise<void> {
    if (!this.correlatedKafkaRequest) {
      this.correlatedKafkaRequest = new CorrelatedKafkaRequest(AuditLogKafkaTopic.CreateLog);
    }
  }

  async createLog(data: CorrelatedRequestDTO<CreateLogDTO>): Promise<CorrelatedResponseDTO<DidCreateLogDTO>> {
    if (!this.correlatedKafkaRequest) {
      throw new Error('Audit log service not initialized');
    }

    CreateLogDTOSchema.parse(data.data);

    return await this.correlatedKafkaRequest.send(data) as CorrelatedResponseDTO<DidCreateLogDTO>;
  }
}

export default new AuditLogService();
