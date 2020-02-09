import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyProviderId} from '../data/key-provider-id';


export interface RetrieveClientCert {
  _this: ManagedObjectReference;
  cluster: KeyProviderId;
}