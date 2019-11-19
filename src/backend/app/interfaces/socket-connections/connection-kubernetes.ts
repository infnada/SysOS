import {Connection} from './connection';

export interface ConnectionKubernetes extends Connection {
  type: 'kubernetes';
  credential: string;
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
}
