
import {ExtendedElementDescription} from './extended-element-description';
import {ProfileParameterMetadata} from './profile-parameter-metadata';

export interface ProfilePolicyOptionMetadata {
  id: ExtendedElementDescription;
  parameter?
        : ProfileParameterMetadata[];
}