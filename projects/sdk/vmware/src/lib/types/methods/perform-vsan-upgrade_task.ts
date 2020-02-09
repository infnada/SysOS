import {ManagedObjectReference} from '../data/managed-object-reference';


export interface PerformVsanUpgrade_Task {
  _this: ManagedObjectReference;
  cluster: ManagedObjectReference & { $type: 'ClusterComputeResource'; };
  performObjectUpgrade?: boolean;
  downgradeFormat?: boolean;
  allowReducedRedundancy?: boolean;
  excludeHosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
}