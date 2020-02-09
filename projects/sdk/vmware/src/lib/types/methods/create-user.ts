import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostAccountSpec} from '../data/host-account-spec';


export interface CreateUser {
  _this: ManagedObjectReference;
  user: HostAccountSpec;
}