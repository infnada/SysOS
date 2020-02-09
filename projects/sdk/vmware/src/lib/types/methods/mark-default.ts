import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyProviderId} from '../data/key-provider-id';


export interface MarkDefault {
  _this: ManagedObjectReference;
  clusterId: KeyProviderId;
}