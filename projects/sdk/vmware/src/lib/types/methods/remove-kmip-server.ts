import {ManagedObjectReference} from '../data/managed-object-reference';
import {KeyProviderId} from '../data/key-provider-id';


export interface RemoveKmipServer {
  _this: ManagedObjectReference;
  clusterId: KeyProviderId;
  serverName: string;
}