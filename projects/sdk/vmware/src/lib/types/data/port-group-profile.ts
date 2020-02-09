import {ApplyProfile} from './apply-profile';

import {NetworkPolicyProfile} from './network-policy-profile';
import {VlanProfile} from './vlan-profile';
import {VirtualSwitchSelectionProfile} from './virtual-switch-selection-profile';

export interface PortGroupProfile extends ApplyProfile {
  key: string;
  name: string;
  networkPolicy: NetworkPolicyProfile;
  vlan: VlanProfile;
  vswitch: VirtualSwitchSelectionProfile;
}