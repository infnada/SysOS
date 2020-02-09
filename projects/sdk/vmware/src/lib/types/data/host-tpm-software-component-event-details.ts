import {HostTpmEventDetails} from './host-tpm-event-details';


export interface HostTpmSoftwareComponentEventDetails extends HostTpmEventDetails {
  componentName: string;
  vibName: string;
  vibVendor: string;
  vibVersion: string;
}