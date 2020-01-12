import {LicenseEvent} from './license-event';

export interface ServerLicenseExpiredEvent extends LicenseEvent {
  product: string;
}
