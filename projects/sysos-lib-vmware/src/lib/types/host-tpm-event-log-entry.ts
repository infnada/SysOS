import {DynamicData} from './dynamic-data';

import {HostTpmEventDetails} from './host-tpm-event-details';
import {Int} from './int';
export interface HostTpmEventLogEntry extends DynamicData {
  eventDetails: HostTpmEventDetails;
  pcrIndex: Int;
}
