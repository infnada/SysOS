import {Credential} from '@anyopsos/module-credential';

export interface ConnectionDockerServer {
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
  credential: Credential;
}
