import {ManagedObjectReference} from '../data/managed-object-reference';
import {RetrieveVStorageObjSpec} from '../data/retrieve-v-storage-obj-spec';


export interface RetrieveVStorageObjectAssociations {
  _this: ManagedObjectReference;
  ids?: RetrieveVStorageObjSpec[];
}