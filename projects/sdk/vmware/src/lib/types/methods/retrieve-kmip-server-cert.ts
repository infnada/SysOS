import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyProviderId} from '../data/key-provider-id';
import {KmipServerInfo} from '../data/kmip-server-info';


export interface RetrieveKmipServerCert {
  _this: ManagedObjectReference;
  keyProvider: KeyProviderId;
  server: KmipServerInfo;
}