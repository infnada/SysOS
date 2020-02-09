import {ApplyProfile} from './apply-profile';

import {IpAddressProfile} from './ip-address-profile';

export interface NsxHostVNicProfile extends ApplyProfile {
  ipConfig: IpAddressProfile;
  key: string;
}