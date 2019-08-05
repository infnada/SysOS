import {DynamicData} from './dynamic-data';

import {ExtendedElementDescription} from './extended-element-description';
import {ProfileParameterMetadata} from './profile-parameter-metadata';
export interface ProfilePolicyOptionMetadata extends DynamicData {
  id: ExtendedElementDescription;
  parameter?: ProfileParameterMetadata[];
}
