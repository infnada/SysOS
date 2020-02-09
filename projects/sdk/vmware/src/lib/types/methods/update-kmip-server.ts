import {ManagedObjectReference} from '../data/managed-object-reference';
import {KmipServerSpec} from '../data/kmip-server-spec';


export interface UpdateKmipServer {
  _this: ManagedObjectReference;
  server: KmipServerSpec;
}