import {ApplyProfile} from './apply-profile';

import {AuthenticationProfile} from './authentication-profile';
import {DateTimeProfile} from './date-time-profile';
import {FirewallProfile} from './firewall-profile';
import {HostMemoryProfile} from './host-memory-profile';
import {NetworkProfile} from './network-profile';
import {OptionProfile} from './option-profile';
import {SecurityProfile} from './security-profile';
import {ServiceProfile} from './service-profile';
import {StorageProfile} from './storage-profile';
import {UserProfile} from './user-profile';
import {UserGroupProfile} from './user-group-profile';
export interface HostApplyProfile extends ApplyProfile {
  authentication?: AuthenticationProfile;
  datetime?: DateTimeProfile;
  firewall?: FirewallProfile;
  memory?: HostMemoryProfile;
  network?: NetworkProfile;
  option?: OptionProfile[];
  security?: SecurityProfile;
  service?: ServiceProfile[];
  storage?: StorageProfile;
  userAccount?: UserProfile[];
  usergroupAccount?: UserGroupProfile[];
}
