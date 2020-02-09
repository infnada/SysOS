import {ManagedObjectReference} from '../data/managed-object-reference';
import {ClusterProfileConfigSpec} from '../data/cluster-profile-config-spec';


export interface UpdateClusterProfile {
  _this: ManagedObjectReference;
  config: ClusterProfileConfigSpec;
}