import { v4 as uuidv4 } from 'uuid';
import { CorrelatedMessage, TransportAwareService, TransportAdapterName, transportService } from 'transport-pkg';
import { IAppPkg, AppRunPriority } from 'app-life-cycle-pkg';

import { CreateLogDTO } from '../types/audit-log.dto';
import { AuditLogAction } from '../common/constants';

class AuditLogService extends TransportAwareService implements IAppPkg {
  async init(): Promise<void> {
    //TODO: use service-discovery here
    this.useTransport(TransportAdapterName.HTTP, { host: 'audit-log', port: 3050 });
  }

  getPriority(): number {
    return AppRunPriority.Highest;
  }

  async createLog(data: CreateLogDTO, correlationId?: string): Promise<void> {
    const message: CorrelatedMessage = CorrelatedMessage.create(
      correlationId || uuidv4(),
      AuditLogAction.CreateLog,
      this.getActiveTransport(),
      data
    );

    await transportService.send(message, this.getActiveTransportOptions());
  }
}

export default new AuditLogService();
