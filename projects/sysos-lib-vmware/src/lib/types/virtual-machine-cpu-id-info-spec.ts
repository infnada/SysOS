import {ArrayUpdateSpec} from './array-update-spec';

import {HostCpuIdInfo} from './host-cpu-id-info';
export interface VirtualMachineCpuIdInfoSpec extends ArrayUpdateSpec {
  info?: HostCpuIdInfo;
}
