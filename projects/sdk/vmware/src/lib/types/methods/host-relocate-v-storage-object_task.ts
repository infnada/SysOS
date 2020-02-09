import {ManagedObjectReference} from '../data/managed-object-reference';
import {ID} from '../data/i-d';
import {VslmRelocateSpec} from '../data/vslm-relocate-spec';


export interface HostRelocateVStorageObject_Task {
  _this: ManagedObjectReference;
  id: ID;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  spec: VslmRelocateSpec;
}