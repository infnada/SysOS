import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyProviderId} from '../data/key-provider-id';


export interface RetrieveSelfSignedClientCert {
  _this: ManagedObjectReference;
  cluster: KeyProviderId;
}