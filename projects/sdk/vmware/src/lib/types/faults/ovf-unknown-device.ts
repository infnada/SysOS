import {OvfSystemFault} from './ovf-system-fault';

import {VirtualDevice} from '../data/virtual-device';

export interface OvfUnknownDevice extends OvfSystemFault {
  device?: VirtualDevice;
  vmName: string;
}