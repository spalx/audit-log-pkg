import { v4 as uuidv4 } from 'uuid';
import { CorrelatedMessage, TransportAwareService, TransportAdapterName, transportService, CircuitBreaker } from 'transport-pkg';
import { IAppPkg, AppRunPriority } from 'app-life-cycle-pkg';
import { serviceDiscoveryService, ServiceDTO } from 'service-discovery-pkg';
import { GetAllRestQueryParams, GetAllRestPaginatedResponse } from 'rest-pkg';

import { LogDTO } from '../types/audit-log.dto';
import { AuditLogAction, SERVICE_NAME } from '../common/constants';

class AuditLogService extends TransportAwareService implements IAppPkg {
  private sendBreaker: CircuitBreaker<[CorrelatedMessage, Record<string, unknown>], CorrelatedMessage>;

  constructor() {
    super();

    this.sendBreaker = new CircuitBreaker<[CorrelatedMessage, Record<string, unknown>], CorrelatedMessage>(
      (req, options) => transportService.send(req, options),
      {
        timeout: 2000,
        errorThresholdPercentage: 50,
        retryTimeout: 5000,
      }
    );
  }

  async init(): Promise<void> {
    const service: ServiceDTO = await serviceDiscoveryService.getService(SERVICE_NAME);

    this.useTransport(TransportAdapterName.HTTP, { host: service.host, port: service.port });
  }

  getPriority(): number {
    return AppRunPriority.Medium;
  }

  getName(): string {
    return 'audit-log';
  }

  getDependencies(): IAppPkg[] {
    return [
      transportService,
      serviceDiscoveryService
    ];
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

    const response = await this.sendBreaker.exec(message, this.getActiveTransportOptions());
    return response.data;
  }
}

export default new AuditLogService();
