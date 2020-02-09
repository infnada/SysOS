import {Connection} from '@anyopsos/backend/app/types/connection';
import {DataObject} from '@anyopsos/backend/app/types/data-object';

export interface ConnectionSnmp extends Connection {
  type: 'snmp';
  host: string;
  port: number;
  trapPort: number;
  version: 'v1' | 'v2c' | 'v3'
  community: string;
  hopServerUuid: string;
  data: {
    Base: {
      name: string;
    };
    Data: (DataObject & { info: { data: any } })[];
  };
}
