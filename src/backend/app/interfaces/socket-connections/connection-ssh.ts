import {Connection} from './connection';

export interface ConnectionSsh extends Connection {
  type: 'ssh';
  host: string;
  port: number;
  credential: string;
  hophost?: string;
  hopport?: number;
  hopcredential?: string;
}
