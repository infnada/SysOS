import {ApplyProfile} from './apply-profile';

import {PermissionProfile} from './permission-profile';
export interface SecurityProfile extends ApplyProfile {
  permission?: PermissionProfile[];
}
