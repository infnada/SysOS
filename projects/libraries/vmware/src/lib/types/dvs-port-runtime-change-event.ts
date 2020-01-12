import {DvsEvent} from './dvs-event';

import {DVPortStatus} from './d-v-port-status';
export interface DvsPortRuntimeChangeEvent extends DvsEvent {
  portKey: string;
  runtimeInfo: DVPortStatus;
}
