import {DynamicData} from './dynamic-data';

import {VsanHostDecommissionMode} from './vsan-host-decommission-mode';
export interface HostMaintenanceSpec extends DynamicData {
  vsanMode?: VsanHostDecommissionMode;
}
