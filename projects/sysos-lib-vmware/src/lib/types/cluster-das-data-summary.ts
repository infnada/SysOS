import {ClusterDasData} from './cluster-das-data';
import {Long} from './long';

export interface ClusterDasDataSummary extends ClusterDasData {
  clusterConfigVersion: Long;
  compatListVersion: Long;
  hostListVersion: Long;
}
