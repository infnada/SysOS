import {ImConnection} from './im-connection';
import {ImDataObject} from '../im-data-object';

export interface ConnectionKubernetes extends ImConnection {
  type: 'kubernetes';
  credential: string;
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
  data: {
    Base: {
      name: string;
    };
    Data: ImDataObject[];
  };
}
