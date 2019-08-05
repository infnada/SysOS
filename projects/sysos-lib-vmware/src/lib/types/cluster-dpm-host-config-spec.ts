import {ArrayUpdateSpec} from './array-update-spec';

import {ClusterDpmHostConfigInfo} from './cluster-dpm-host-config-info';
export interface ClusterDpmHostConfigSpec extends ArrayUpdateSpec {
  info?: ClusterDpmHostConfigInfo;
}
