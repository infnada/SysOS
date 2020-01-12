import {DynamicData} from './dynamic-data';

import {DVPortConfigInfo} from './d-v-port-config-info';
import {DistributedVirtualSwitchPortConnectee} from './distributed-virtual-switch-port-connectee';
import {ManagedObjectReference} from './managed-object-reference';
import {DVPortState} from './d-v-port-state';
import {Int} from './int';
import {DateTime} from './date-time';
export interface DistributedVirtualPort extends DynamicData {
  config: DVPortConfigInfo;
  conflict: boolean;
  conflictPortKey?: string;
  connectee?: DistributedVirtualSwitchPortConnectee;
  connectionCookie?: Int;
  dvsUuid: string;
  hostLocalPort?: boolean;
  key: string;
  lastStatusChange: DateTime;
  portgroupKey?: string;
  proxyHost?: ManagedObjectReference & { $type: 'HostSystem' };
  state?: DVPortState;
}
