import {ManagedObjectReference} from '../data/managed-object-reference';
import {DatastoreVVolContainerFailoverPair} from '../data/datastore-v-vol-container-failover-pair';


export interface UpdateVVolVirtualMachineFiles_Task {
  _this: ManagedObjectReference;
  failoverPair?: DatastoreVVolContainerFailoverPair[];
}