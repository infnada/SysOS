import {OvfSystemFault} from './ovf-system-fault';

import {VirtualDevice} from './virtual-device';
export interface OvfUnknownDevice extends OvfSystemFault {
  device?: VirtualDevice;
  vmName: string;
}
