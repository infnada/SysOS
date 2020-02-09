import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostApplyProfile} from '../data/host-apply-profile';


export interface RetrieveHostCustomizationsForProfile {
  _this: ManagedObjectReference;
  hosts?: ManagedObjectReference & { $type: 'HostSystem[]'; };
  applyProfile: HostApplyProfile;
}