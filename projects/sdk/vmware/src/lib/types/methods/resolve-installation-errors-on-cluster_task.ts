import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ResolveInstallationErrorsOnCluster_Task {
  _this: ManagedObjectReference;
  filterId: string;
  cluster: ManagedObjectReference & { $type: 'ClusterComputeResource'; };
}