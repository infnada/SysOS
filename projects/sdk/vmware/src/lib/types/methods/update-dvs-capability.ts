import {ManagedObjectReference} from '../data/managed-object-reference';
import {DVSCapability} from '../data/d-v-s-capability';


export interface UpdateDvsCapability {
  _this: ManagedObjectReference;
  capability: DVSCapability;
}