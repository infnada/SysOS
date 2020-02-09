import {PortGroupProfile} from './port-group-profile';

import {IpAddressProfile} from './ip-address-profile';

export interface HostPortGroupProfile extends PortGroupProfile {
  ipConfig: IpAddressProfile;
}