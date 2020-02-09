import {ManagedObjectReference} from '../data/managed-object-reference';
import {ID} from '../data/i-d';
import {KeyValue} from '../data/key-value';


export interface HostUpdateVStorageObjectMetadata_Task {
  _this: ManagedObjectReference;
  id: ID;
  datastore: ManagedObjectReference & { $type: 'Datastore'; };
  metadata?: KeyValue[];
  deleteKeys?: string[];
}