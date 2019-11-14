import {DynamicData} from './dynamic-data';

import {VsanClusterConfigInfoHostDefaultInfo} from './vsan-cluster-config-info-host-default-info';
export interface VsanClusterConfigInfo extends DynamicData {
  defaultConfig?: VsanClusterConfigInfoHostDefaultInfo;
  enabled?: boolean;
}
