import {KdbxCredential} from '@anyopsos/module-credential/src';

export interface ConnectionMonitorServer {
  host: string;
  port: number;
  credential: KdbxCredential;
}
