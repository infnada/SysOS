import {ManagedObjectReference} from '../data/managed-object-reference';
import {KmipClusterInfo} from '../data/kmip-cluster-info';


export interface RetrieveKmipServersStatus_Task {
  _this: ManagedObjectReference;
  clusters?: KmipClusterInfo[];
}