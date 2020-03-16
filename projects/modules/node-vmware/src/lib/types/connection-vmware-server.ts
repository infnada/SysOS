import {Credential} from '@anyopsos/module-credential';

export interface ConnectionVmwareServer {
  host: string;
  port: number;
  credential: Credential;
}
