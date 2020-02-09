import {ManagedObjectReference} from '../data/managed-object-reference';
import {StoragePlacementSpec} from '../data/storage-placement-spec';


export interface RecommendDatastores {
  _this: ManagedObjectReference;
  storageSpec: StoragePlacementSpec;
}