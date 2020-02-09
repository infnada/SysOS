import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostAccountSpec} from '../data/host-account-spec';


export interface CreateGroup {
  _this: ManagedObjectReference;
  group: HostAccountSpec;
}