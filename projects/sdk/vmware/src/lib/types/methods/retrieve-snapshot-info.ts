import {ManagedObjectReference} from '../data/managed-object-reference';
import {ID} from '../data/i-d';


export interface RetrieveSnapshotInfo {
  _this: ManagedObjectReference;
  id: ID;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}