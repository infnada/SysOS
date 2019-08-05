import {OvfExport} from './ovf-export';

import {VirtualCdrom} from './virtual-cdrom';
export interface ConnectedIso extends OvfExport {
  cdrom: VirtualCdrom;
  filename: string;
}
