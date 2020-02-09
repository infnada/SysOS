import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryUnmonitoredHosts {
  _this: ManagedObjectReference;
  providerId: string;
  cluster: ManagedObjectReference & { $type: 'ClusterComputeResource'; };
}