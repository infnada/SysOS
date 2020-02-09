import {ManagedObjectReference} from '../data/managed-object-reference';
import {ID} from '../data/i-d';
import {VirtualMachineProfileSpec} from '../data/virtual-machine-profile-spec';


export interface UpdateVStorageObjectPolicy_Task {
  _this: ManagedObjectReference;
  id: ID;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  profile?: VirtualMachineProfileSpec[];
}