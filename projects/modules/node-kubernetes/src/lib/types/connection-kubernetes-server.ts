import {Credential} from '@anyopsos/module-credential';

export interface ConnectionKubernetesServer {
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
  credential: Credential;
}
