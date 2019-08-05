import {DvsEvent} from './dvs-event';

import {DVPortStatus} from './d-v-port-status';
export interface DvsPortExitedPassthruEvent extends DvsEvent {
  portKey: string;
  runtimeInfo?: DVPortStatus;
}
