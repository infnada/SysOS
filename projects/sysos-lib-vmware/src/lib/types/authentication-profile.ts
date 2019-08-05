import {ApplyProfile} from './apply-profile';

import {ActiveDirectoryProfile} from './active-directory-profile';
export interface AuthenticationProfile extends ApplyProfile {
  activeDirectory?: ActiveDirectoryProfile;
}
