import {ManagedObjectReference} from '../data/managed-object-reference';
import {FcoeConfigFcoeSpecification} from '../data/fcoe-config-fcoe-specification';


export interface DiscoverFcoeHbas {
  _this: ManagedObjectReference;
  fcoeSpec: FcoeConfigFcoeSpecification;
}