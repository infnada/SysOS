import {ProfilePolicyOptionMetadata} from './profile-policy-option-metadata';

import {ProfileParameterMetadata} from './profile-parameter-metadata';
export interface UserInputRequiredParameterMetadata extends ProfilePolicyOptionMetadata {
  userInputParameter?: ProfileParameterMetadata[];
}
