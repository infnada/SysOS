import {LicenseEvent} from './license-event';


export interface InvalidEditionEvent extends LicenseEvent {
  feature: string;
}