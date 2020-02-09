import {DynamicData} from './dynamic-data';

import {HostVirtualSwitchSpec} from './host-virtual-switch-spec';

export interface HostVirtualSwitch extends DynamicData {
  key: string;
  mtu?: number;
  name: string;
  numPorts: number;
  numPortsAvailable: number;
  pnic?: string[];
  portgroup?: string[];
  spec: HostVirtualSwitchSpec;
}