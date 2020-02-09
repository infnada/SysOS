import {PortGroupProfile} from './port-group-profile';

import {IpAddressProfile} from './ip-address-profile';

export interface ServiceConsolePortGroupProfile extends PortGroupProfile {
  ipConfig: IpAddressProfile;
}