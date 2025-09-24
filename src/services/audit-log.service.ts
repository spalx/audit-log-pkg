import { v4 as uuidv4 } from 'uuid';
import { CorrelatedMessage, TransportAwareService, TransportAdapterName, transportService } from 'transport-pkg';
import { IAppPkg, AppRunPriority } from 'app-life-cycle-pkg';
import { serviceDiscoveryService, ServiceDTO } from 'service-discovery-pkg';

import { CreateLogDTO } from '../types/audit-log.dto';
import { AuditLogAction, SERVICE_NAME } from '../common/constants';

class AuditLogService extends TransportAwareService implements IAppPkg {
  async init(): Promise<void> {
    const service: ServiceDTO = await serviceDiscoveryService.getService(SERVICE_NAME);

    this.useTransport(TransportAdapterName.HTTP, { host: service.host, port: service.port });
  }

  getPriority(): number {
    return AppRunPriority.Medium;
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
