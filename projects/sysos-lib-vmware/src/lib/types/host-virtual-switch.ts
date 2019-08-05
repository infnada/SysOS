import {DynamicData} from './dynamic-data';

import {HostVirtualSwitchSpec} from './host-virtual-switch-spec';
import {Int} from './int';
export interface HostVirtualSwitch extends DynamicData {
  key: string;
  mtu?: Int;
  name: string;
  numPorts: Int;
  numPortsAvailable: Int;
  pnic?: string[];
  portgroup?: string[];
  spec: HostVirtualSwitchSpec;
}
