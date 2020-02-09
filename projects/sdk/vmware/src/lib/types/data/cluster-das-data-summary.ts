import {ClusterDasData} from './cluster-das-data';


export interface ClusterDasDataSummary extends ClusterDasData {
  clusterConfigVersion: number;
  compatListVersion: number;
  hostListVersion: number;
}