import {DynamicData} from './dynamic-data';

import {DVPortConfigInfo} from './d-v-port-config-info';
import {DistributedVirtualSwitchPortConnectee} from './distributed-virtual-switch-port-connectee';
import {ManagedObjectReference} from './managed-object-reference';
import {DVPortState} from './d-v-port-state';

export interface DistributedVirtualPort extends DynamicData {
  config: DVPortConfigInfo;
  conflict: boolean;
  conflictPortKey?: string;
  connectee?: DistributedVirtualSwitchPortConnectee;
  connectionCookie?: number;
  dvsUuid: string;
  hostLocalPort?: boolean;
  key: string;
  lastStatusChange: string;
  portgroupKey?: string;
  proxyHost?: ManagedObjectReference & { $type: 'HostSystem'; };
  state?: DVPortState;
}