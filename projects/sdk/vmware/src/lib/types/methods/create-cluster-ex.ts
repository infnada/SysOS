import {ManagedObjectReference} from '../data/managed-object-reference';
import {ClusterConfigSpecEx} from '../data/cluster-config-spec-ex';


export interface CreateClusterEx {
  _this: ManagedObjectReference;
  name: string;
  spec: ClusterConfigSpecEx;
}