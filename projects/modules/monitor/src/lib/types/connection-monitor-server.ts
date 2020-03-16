import {Credential} from '@anyopsos/module-credential';

export interface ConnectionMonitorServer {
  host: string;
  port: number;
  credential: Credential;
}
