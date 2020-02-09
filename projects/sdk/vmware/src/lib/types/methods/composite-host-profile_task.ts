import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostApplyProfile} from '../data/host-apply-profile';


export interface CompositeHostProfile_Task {
  _this: ManagedObjectReference;
  source: ManagedObjectReference & { $type: 'Profile'; };
  targets?: ManagedObjectReference & { $type: 'Profile[]'; };
  toBeMerged?: HostApplyProfile;
  toBeReplacedWith?: HostApplyProfile;
  toBeDeleted?: HostApplyProfile;
  enableStatusToBeCopied?: HostApplyProfile;
}