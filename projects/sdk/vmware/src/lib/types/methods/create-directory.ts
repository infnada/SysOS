import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CreateDirectory {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  displayName?: string;
  policy?: string;
}