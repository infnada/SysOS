import {LicenseEvent} from './license-event';


export interface LicenseServerUnavailableEvent extends LicenseEvent {
  licenseServer: string;
}