import {ApplyProfile} from './apply-profile';

import {LinkProfile} from './link-profile';
import {NetworkPolicyProfile} from './network-policy-profile';
import {NumPortsProfile} from './num-ports-profile';
export interface VirtualSwitchProfile extends ApplyProfile {
  key: string;
  link: LinkProfile;
  name: string;
  networkPolicy: NetworkPolicyProfile;
  numPorts: NumPortsProfile;
}
