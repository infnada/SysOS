import {Connection} from '@anyopsos/backend/app/types/connection';

export interface ConnectionSsh extends Connection {
  type: 'ssh';
  host: string;
  port: number;
  credential: string;
  hopServerUuid: string;
}
