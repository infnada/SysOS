import {Connection} from '@anyopsos/backend/app/types/connection';

export interface ConnectionKubernetes extends Connection {
  type: 'kubernetes';
  credential: string;
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
}
