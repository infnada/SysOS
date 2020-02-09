import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpdateLocalSwapDatastore {
  _this: ManagedObjectReference;
  datastore?: ManagedObjectReference & { $type: 'Datastore'; };
}