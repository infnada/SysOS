import {DvsEvent} from './dvs-event';

import {DVPortStatus} from './d-v-port-status';

export interface DvsPortEnteredPassthruEvent extends DvsEvent {
  portKey: string;
  runtimeInfo?: DVPortStatus;
}