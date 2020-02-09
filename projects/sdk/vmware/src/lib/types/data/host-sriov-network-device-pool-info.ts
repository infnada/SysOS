import {HostSriovDevicePoolInfo} from './host-sriov-device-pool-info';

import {PhysicalNic} from './physical-nic';

export interface HostSriovNetworkDevicePoolInfo extends HostSriovDevicePoolInfo {
  pnic?: PhysicalNic[];
  switchKey?: string;
  switchUuid?: string;
}