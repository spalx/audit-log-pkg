import { v4 as uuidv4 } from 'uuid';
import { CorrelatedMessage, TransportAwareService, TransportAdapterName, transportService } from 'transport-pkg';
import { IAppPkg, AppRunPriority } from 'app-life-cycle-pkg';
import { serviceDiscoveryService, ServiceDTO } from 'service-discovery-pkg';
import { GetAllRestQueryParams, GetAllRestPaginatedResponse } from 'rest-pkg';

import { LogDTO } from '../types/audit-log.dto';
import { AuditLogAction, SERVICE_NAME } from '../common/constants';

class AuditLogService extends TransportAwareService implements IAppPkg {
  async init(): Promise<void> {
    const service: ServiceDTO = await serviceDiscoveryService.getService(SERVICE_NAME);

    this.useTransport(TransportAdapterName.HTTP, { host: service.host, port: service.port });
  }

  getPriority(): number {
    return AppRunPriority.Medium;
  }

  async createLog(data: LogDTO, correlationId?: string): Promise<void> {
    await this.sendActionViaTransport(AuditLogAction.CreateLog, data, correlationId);
  }

  async getLogs(data: GetAllRestQueryParams, correlationId?: string): Promise<GetAllRestPaginatedResponse<LogDTO>> {
    return (await this.sendActionViaTransport(AuditLogAction.GetLogs, data, correlationId) as GetAllRestPaginatedResponse<LogDTO>);
  }

  private async sendActionViaTransport(action: AuditLogAction, data: object, correlationId?: string): Promise<object> {
    const message: CorrelatedMessage = CorrelatedMessage.create(
      correlationId || uuidv4(),
      action,
      this.getActiveTransport(),
      data
    );

    const response: CorrelatedMessage = await transportService.send(message, this.getActiveTransportOptions());
    return response.data;
  }
}

export default new AuditLogService();
