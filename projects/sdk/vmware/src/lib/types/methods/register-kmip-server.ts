import {ManagedObjectReference} from '../data/managed-object-reference';
import {KmipServerSpec} from '../data/kmip-server-spec';


export interface RegisterKmipServer {
  _this: ManagedObjectReference;
  server: KmipServerSpec;
}