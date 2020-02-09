import {DynamicData} from './dynamic-data';

import {HostTargetTransport} from './host-target-transport';

export interface HostPlugStoreTopologyTarget extends DynamicData {
  key: string;
  transport?: HostTargetTransport;
}