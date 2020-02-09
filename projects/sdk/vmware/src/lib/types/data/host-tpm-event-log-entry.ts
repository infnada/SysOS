import {DynamicData} from './dynamic-data';

import {HostTpmEventDetails} from './host-tpm-event-details';

export interface HostTpmEventLogEntry extends DynamicData {
  eventDetails: HostTpmEventDetails;
  pcrIndex: number;
}