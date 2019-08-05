import {HostTpmEventDetails} from './host-tpm-event-details';
import {Byte} from './byte';

export interface HostTpmOptionEventDetails extends HostTpmEventDetails {
  bootOptions?: Byte[];
  optionsFileName: string;
}
