import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryAvailableDisksForVmfs {
  _this: ManagedObjectReference;
  datastore?: ManagedObjectReference & { $type: 'Datastore'; };
}