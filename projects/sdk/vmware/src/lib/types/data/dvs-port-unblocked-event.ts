import {DvsEvent} from './dvs-event';

import {DVPortStatus} from './d-v-port-status';

export interface DvsPortUnblockedEvent extends DvsEvent {
  portKey: string;
  prevBlockState?: string;
  runtimeInfo?: DVPortStatus;
}