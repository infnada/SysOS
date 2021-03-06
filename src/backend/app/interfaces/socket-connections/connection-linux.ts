import {Connection} from './connection';

export interface ConnectionLinux extends Connection {
  type: 'linux';
  host: string;
  port: number;
  credential: string;
  hopServerUuid: string;
}
