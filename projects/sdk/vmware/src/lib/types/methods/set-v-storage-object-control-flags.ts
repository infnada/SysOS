import {ManagedObjectReference} from '../data/managed-object-reference';
import {ID} from '../data/i-d';


export interface SetVStorageObjectControlFlags {
  _this: ManagedObjectReference;
  id: ID;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  controlFlags?: string[];
}