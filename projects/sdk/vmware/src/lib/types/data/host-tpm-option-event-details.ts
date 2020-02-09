import {HostTpmEventDetails} from './host-tpm-event-details';


export interface HostTpmOptionEventDetails extends HostTpmEventDetails {
  bootOptions?: number[];
  optionsFileName: string;
}