import {ManagedObjectReference} from '../data/managed-object-reference';
import {PlacementSpec} from '../data/placement-spec';


export interface PlaceVm {
  _this: ManagedObjectReference;
  placementSpec: PlacementSpec;
}