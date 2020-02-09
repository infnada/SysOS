import {DynamicData} from './dynamic-data';

import {HostPlugStoreTopologyAdapter} from './host-plug-store-topology-adapter';
import {HostPlugStoreTopologyDevice} from './host-plug-store-topology-device';
import {HostPlugStoreTopologyPath} from './host-plug-store-topology-path';
import {HostPlugStoreTopologyPlugin} from './host-plug-store-topology-plugin';
import {HostPlugStoreTopologyTarget} from './host-plug-store-topology-target';

export interface HostPlugStoreTopology extends DynamicData {
  adapter?: HostPlugStoreTopologyAdapter[];
  device?: HostPlugStoreTopologyDevice[];
  path?: HostPlugStoreTopologyPath[];
  plugin?: HostPlugStoreTopologyPlugin[];
  target?: HostPlugStoreTopologyTarget[];
}