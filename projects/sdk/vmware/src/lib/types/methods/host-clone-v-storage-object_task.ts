import {ManagedObjectReference} from '../data/managed-object-reference';
import {ID} from '../data/i-d';
import {VslmCloneSpec} from '../data/vslm-clone-spec';


export interface HostCloneVStorageObject_Task {
  _this: ManagedObjectReference;
  id: ID;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  spec: VslmCloneSpec;
}