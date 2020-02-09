import {DynamicData} from './dynamic-data';

import {ExtendedElementDescription} from './extended-element-description';
import {ProfilePolicyOptionMetadata} from './profile-policy-option-metadata';

export interface ProfilePolicyMetadata extends DynamicData {
  id: ExtendedElementDescription;
  possibleOption: ProfilePolicyOptionMetadata[];
}