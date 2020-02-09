import {OvfExport} from './ovf-export';

import {VirtualCdrom} from '../data/virtual-cdrom';

export interface ConnectedIso extends OvfExport {
  cdrom: VirtualCdrom;
  filename: string;
}