import {Connection} from './connection';

export interface ConnectionSftp extends Connection {
  type: 'sftp';
  host: string;
  port: number;
  credential: string;
  hophost?: string;
  hopport?: number;
  hopcredential?: string;
}
