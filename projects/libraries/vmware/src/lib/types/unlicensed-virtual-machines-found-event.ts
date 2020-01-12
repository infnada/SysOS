import {LicenseEvent} from './license-event';
import {Int} from './int';

export interface UnlicensedVirtualMachinesFoundEvent extends LicenseEvent {
  available: Int;
}
