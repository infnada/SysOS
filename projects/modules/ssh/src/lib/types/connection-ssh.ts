import {Connection} from '@anyopsos/backend-core/app/types/connection';

export interface ConnectionSsh extends Connection {
  type: 'ssh';
  host: string;
  port: number;
  credential: string;
  hopServerUuid: string;
}
