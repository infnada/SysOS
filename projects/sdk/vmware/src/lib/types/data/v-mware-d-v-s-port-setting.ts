import {DVPortSetting} from './d-v-port-setting';

import {BoolPolicy} from './bool-policy';
import {VMwareUplinkLacpPolicy} from './v-mware-uplink-lacp-policy';
import {DVSMacManagementPolicy} from './d-v-s-mac-management-policy';
import {IntPolicy} from './int-policy';
import {DVSSecurityPolicy} from './d-v-s-security-policy';
import {VmwareUplinkPortTeamingPolicy} from './vmware-uplink-port-teaming-policy';
import {VmwareDistributedVirtualSwitchVlanSpec} from './vmware-distributed-virtual-switch-vlan-spec';

export interface VMwareDVSPortSetting extends DVPortSetting {
  ipfixEnabled?: BoolPolicy;
  lacpPolicy?: VMwareUplinkLacpPolicy;
  macManagementPolicy?: DVSMacManagementPolicy;
  qosTag?: IntPolicy;
  securityPolicy?: DVSSecurityPolicy;
  txUplink?: BoolPolicy;
  uplinkTeamingPolicy?: VmwareUplinkPortTeamingPolicy;
  vlan?: VmwareDistributedVirtualSwitchVlanSpec;
}