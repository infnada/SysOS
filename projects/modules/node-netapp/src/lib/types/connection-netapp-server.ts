import {Credential} from '@anyopsos/module-credential';

export interface ConnectionNetappServer {
  host: string;
  port: number;
  credential: Credential;
}
