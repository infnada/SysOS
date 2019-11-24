import {ImConnection} from './im-connection';
import {ImDataObject} from '../im-data-object';

export interface ConnectionDocker extends ImConnection {
  type: 'docker';
  credential: string;
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
  data: {
    Data: ImDataObject[]
  }
}
