import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostAccountSpec} from '../data/host-account-spec';


export interface UpdateUser {
  _this: ManagedObjectReference;
  user: HostAccountSpec;
}