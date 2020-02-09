import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyProviderId} from '../data/key-provider-id';


export interface UploadKmipServerCert {
  _this: ManagedObjectReference;
  cluster: KeyProviderId;
  certificate: string;
}