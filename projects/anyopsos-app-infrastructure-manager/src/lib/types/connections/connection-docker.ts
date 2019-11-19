import {ImConnection} from "./im-connection";

export interface ConnectionDocker extends ImConnection {
  type: 'docker';
  credential: string;
  clusterName: string;
  clusterServer: string;
  clusterCa: string;
}
