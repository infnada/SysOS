import {HostTpmEventDetails} from './host-tpm-event-details';

export interface HostTpmCommandEventDetails extends HostTpmEventDetails {
  commandLine: string;
}
