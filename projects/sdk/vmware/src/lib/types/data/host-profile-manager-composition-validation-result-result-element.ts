import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {HostApplyProfile} from './host-apply-profile';
import {ManagedObjectReference} from './managed-object-reference';

export interface HostProfileManagerCompositionValidationResultResultElement extends DynamicData {
  errors?: LocalizableMessage[];
  sourceDiffForToBeMerged?: HostApplyProfile;
  status: string;
  target: ManagedObjectReference & { $type: 'Profile'; };
  targetDiffForToBeMerged?: HostApplyProfile;
  toBeAdded?: HostApplyProfile;
  toBeDeleted?: HostApplyProfile;
  toBeDisabled?: HostApplyProfile;
  toBeEnabled?: HostApplyProfile;
  toBeReenableCC?: HostApplyProfile;
}