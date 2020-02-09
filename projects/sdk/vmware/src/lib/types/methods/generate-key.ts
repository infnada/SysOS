import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyProviderId} from '../data/key-provider-id';


export interface GenerateKey {
  _this: ManagedObjectReference;
  keyProvider?: KeyProviderId;
}