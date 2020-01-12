import {Connection} from '@anyopsos/backend/app/types/connection';

export interface ConnectionDocker extends Connection {
  type: 'docker';
  credential: string;
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
}
