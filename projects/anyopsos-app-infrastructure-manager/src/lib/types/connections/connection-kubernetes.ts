import {ImConnection} from "./im-connection";

export interface ConnectionKubernetes extends ImConnection {
  type: 'kubernetes';
  credential: string;
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
}
