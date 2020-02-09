import {DvsEvent} from './dvs-event';

import {DVPortStatus} from './d-v-port-status';

export interface DvsPortBlockedEvent extends DvsEvent {
  portKey: string;
  prevBlockState?: string;
  runtimeInfo?: DVPortStatus;
  statusDetail?: string;
}