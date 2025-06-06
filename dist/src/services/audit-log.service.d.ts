import { CorrelatedRequestDTO, CorrelatedResponseDTO } from 'kafka-pkg';
import { IAppPkg } from 'app-life-cycle-pkg';
import { CreateLogDTO, DidCreateLogDTO } from '../types/audit-log.dto';
declare class AuditLogService implements IAppPkg {
    private correlatedKafkaRequest;
    init(): Promise<void>;
    createLog(data: CorrelatedRequestDTO<CreateLogDTO>): Promise<CorrelatedResponseDTO<DidCreateLogDTO>>;
}
declare const _default: AuditLogService;
export default _default;
