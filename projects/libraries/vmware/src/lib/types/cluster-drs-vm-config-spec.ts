import {ArrayUpdateSpec} from './array-update-spec';

import {ClusterDrsVmConfigInfo} from './cluster-drs-vm-config-info';
export interface ClusterDrsVmConfigSpec extends ArrayUpdateSpec {
  info?: ClusterDrsVmConfigInfo;
}
