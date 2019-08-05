import {DynamicData} from './dynamic-data';

import {DistributedVirtualSwitchPortConnection} from './distributed-virtual-switch-port-connection';
export interface VnicPortArgument extends DynamicData {
  port: DistributedVirtualSwitchPortConnection;
  vnic: string;
}
