import {ManagedObjectReference} from '../data/managed-object-reference';


export interface PerformVsanUpgradePreflightCheck {
  _this: ManagedObjectReference;
  cluster: ManagedObjectReference & { $type: 'ClusterComputeResource'; };
  downgradeFormat?: boolean;
}