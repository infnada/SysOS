import {ManagedObjectReference} from '../data/managed-object-reference';
import {ClusterConfigSpec} from '../data/cluster-config-spec';


export interface ReconfigureCluster_Task {
  _this: ManagedObjectReference;
  spec: ClusterConfigSpec;
  modify: boolean;
}