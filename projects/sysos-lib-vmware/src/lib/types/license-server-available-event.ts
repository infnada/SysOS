import {LicenseEvent} from './license-event';

export interface LicenseServerAvailableEvent extends LicenseEvent {
  licenseServer: string;
}
