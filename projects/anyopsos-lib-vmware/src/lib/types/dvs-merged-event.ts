import {DvsEvent} from './dvs-event';

import {DvsEventArgument} from './dvs-event-argument';
export interface DvsMergedEvent extends DvsEvent {
  destinationDvs: DvsEventArgument;
  sourceDvs: DvsEventArgument;
}
