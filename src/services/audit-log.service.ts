import { v4 as uuidv4 } from 'uuid';
import { CorrelatedResponseDTO, TransportAwareService, transportService } from 'transport-pkg';
import { throwErrorForStatus } from 'rest-pkg';
import { IAppPkg, AppRunPriority } from 'app-life-cycle-pkg';

import { CreateLogDTO, DidCreateLogDTO } from '../types/audit-log.dto';
import { AuditLogAction } from '../common/constants';

class AuditLogService extends TransportAwareService implements IAppPkg {
  async init(): Promise<void> {
    transportService.transportsSend([AuditLogAction.CreateLog]);
  }

  getPriority(): number {
    return AppRunPriority.Highest;
  }

  async createLog(data: CreateLogDTO, correlationId?: string): Promise<DidCreateLogDTO> {
    const response: CorrelatedResponseDTO<DidCreateLogDTO> = await transportService.send(
      {
        action: AuditLogAction.CreateLog,
        data,
        correlation_id: correlationId || uuidv4(),
        transport_name: this.getActiveTransport()
      },
      this.getActiveTransportOptions()
    );

    if (response.status !== 0) {
      throwErrorForStatus(response.status, response.error || '');
    }

    return response.data as DidCreateLogDTO;
  }
}

export default new AuditLogService();
