import {ManagedObjectReference} from '../data/managed-object-reference';
import {ID} from '../data/i-d';


export interface AttachDisk_Task {
  _this: ManagedObjectReference;
  diskId: ID;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  controllerKey?: number;
  unitNumber?: number;
}