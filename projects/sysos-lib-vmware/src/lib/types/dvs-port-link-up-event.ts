import {DvsEvent} from './dvs-event';

import {DVPortStatus} from './d-v-port-status';
export interface DvsPortLinkUpEvent extends DvsEvent {
  portKey: string;
  runtimeInfo?: DVPortStatus;
}
