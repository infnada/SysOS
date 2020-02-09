import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryDatastorePerformanceSummary {
  _this: ManagedObjectReference;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
}