import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyProviderId} from '../data/key-provider-id';


export interface UploadClientCert {
  _this: ManagedObjectReference;
  cluster: KeyProviderId;
  certificate: string;
  privateKey: string;
}