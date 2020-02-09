import {ArrayUpdateSpec} from './array-update-spec';

import {ClusterDasVmConfigInfo} from './cluster-das-vm-config-info';

export interface ClusterDasVmConfigSpec extends ArrayUpdateSpec {
  info?: ClusterDasVmConfigInfo;
}