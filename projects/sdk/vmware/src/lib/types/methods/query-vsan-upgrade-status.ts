import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryVsanUpgradeStatus {
  _this: ManagedObjectReference;
  cluster: ManagedObjectReference & { $type: 'ClusterComputeResource'; };
}