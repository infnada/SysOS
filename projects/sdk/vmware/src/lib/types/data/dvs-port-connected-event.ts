import {DvsEvent} from './dvs-event';

import {DistributedVirtualSwitchPortConnectee} from './distributed-virtual-switch-port-connectee';

export interface DvsPortConnectedEvent extends DvsEvent {
  connectee?: DistributedVirtualSwitchPortConnectee;
  portKey: string;
}