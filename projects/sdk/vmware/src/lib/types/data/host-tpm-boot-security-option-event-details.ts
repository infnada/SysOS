import {HostTpmEventDetails} from './host-tpm-event-details';


export interface HostTpmBootSecurityOptionEventDetails extends HostTpmEventDetails {
  bootSecurityOption: string;
}