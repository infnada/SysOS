import {DvsEvent} from './dvs-event';

import {DVSHostLocalPortInfo} from './d-v-s-host-local-port-info';
export interface HostLocalPortCreatedEvent extends DvsEvent {
  hostLocalPort: DVSHostLocalPortInfo;
}
