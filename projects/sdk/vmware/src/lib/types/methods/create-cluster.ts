import {ManagedObjectReference} from '../data/managed-object-reference';
import {ClusterConfigSpec} from '../data/cluster-config-spec';


export interface CreateCluster {
  _this: ManagedObjectReference;
  name: string;
  spec: ClusterConfigSpec;
}