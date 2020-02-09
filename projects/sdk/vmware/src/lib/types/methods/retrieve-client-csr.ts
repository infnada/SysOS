import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyProviderId} from '../data/key-provider-id';


export interface RetrieveClientCsr {
  _this: ManagedObjectReference;
  cluster: KeyProviderId;
}