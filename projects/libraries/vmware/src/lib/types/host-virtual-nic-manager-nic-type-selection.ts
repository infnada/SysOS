import {DynamicData} from './dynamic-data';

import {HostVirtualNicConnection} from './host-virtual-nic-connection';
export interface HostVirtualNicManagerNicTypeSelection extends DynamicData {
  nicType?: string[];
  vnic: HostVirtualNicConnection;
}
