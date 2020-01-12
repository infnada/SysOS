import {Connection} from '@anyopsos/backend/app/types/connection';

export interface ConnectionSnmp extends Connection {
  type: 'snmp';
  host: string;
  port: number;
  so: string;
  community: string;
}
