import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostProfileConfigSpec} from '../data/host-profile-config-spec';


export interface UpdateHostProfile {
  _this: ManagedObjectReference;
  config: HostProfileConfigSpec;
}