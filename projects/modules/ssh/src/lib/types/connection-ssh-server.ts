import {Credential} from '@anyopsos/module-credential';

export interface ConnectionSshServer {
  host: string;
  port: number;
  credential: Credential;
}
