import {InvalidDatastore} from './invalid-datastore';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface DatastoreNotWritableOnHost extends InvalidDatastore {
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}