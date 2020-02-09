import {OvfExport} from './ovf-export';

import {VirtualDevice} from '../data/virtual-device';

export interface OvfHardwareExport extends OvfExport {
  device?: VirtualDevice;
  vmPath: string;
}