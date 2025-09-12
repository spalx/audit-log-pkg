# audit-log-pkg

## auditLogService

Instance of `AuditLogService` used for creating audit logs.<br>
Since this service implements the IAppPkg interface, the recommended way of using it is by registering it in your app initialization script like this:

```ts
// appService is an instance of AppService (app-life-cycle-pkg)
appService.use(auditLogService);
```

### auditLogService methods

| Function | Argument Types | Returns | Description |
| - | - | - | - |
| `createLog(data)` | `data: CreateLogDTO` | `Promise<void>`  | Creates an audit log |

---

## DTO Interfaces

### CreateLogDTO interface

| Key | Type | Notes |
| - | - | - |
| client | string | Name of the client app |
| author | AuditLogAuthor | The user performing the action |
| action | string | The action performed |
| date | Date, optional | When was the action performed |
| meta | `Record<string, unknown>`, optional | Additional meta data |

### AuditLogAuthor interface

| Key | Type | Notes |
| - | - | - |
| id | string | Unique identificator of the user |
| name | string | Name of the user |

---

## Imports

```ts
import {
  auditLogService,
  CreateLogDTO
} from 'audit-log-pkg';
```
