import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyProviderId} from '../data/key-provider-id';


export interface UpdateSelfSignedClientCert {
  _this: ManagedObjectReference;
  cluster: KeyProviderId;
  certificate: string;
}