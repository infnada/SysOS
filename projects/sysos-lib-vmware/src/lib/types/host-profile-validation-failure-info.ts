import {DynamicData} from './dynamic-data';

import {HostApplyProfile} from './host-apply-profile';
import {ProfileUpdateFailedUpdateFailure} from './profile-update-failed-update-failure';
import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
export interface HostProfileValidationFailureInfo extends DynamicData {
  annotation: string;
  applyProfile?: HostApplyProfile;
  failures?: ProfileUpdateFailedUpdateFailure[];
  faults?: LocalizedMethodFault[];
  host?: ManagedObjectReference & { $type: 'HostSystem' };
  name: string;
  updateType: string;
}
