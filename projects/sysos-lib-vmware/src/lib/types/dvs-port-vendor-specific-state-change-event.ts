import {DvsEvent} from './dvs-event';

export interface DvsPortVendorSpecificStateChangeEvent extends DvsEvent {
  portKey: string;
}
