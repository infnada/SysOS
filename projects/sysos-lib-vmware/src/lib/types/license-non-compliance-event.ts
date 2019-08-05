import {LicenseEvent} from './license-event';

export interface LicenseNonComplianceEvent extends LicenseEvent {
  url: string;
}
