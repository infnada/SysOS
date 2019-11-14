import {OvfExport} from './ovf-export';

import {VirtualDevice} from './virtual-device';
export interface OvfHardwareExport extends OvfExport {
  device?: VirtualDevice;
  vmPath: string;
}
