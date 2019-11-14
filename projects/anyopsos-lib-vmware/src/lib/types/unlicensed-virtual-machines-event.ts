import {LicenseEvent} from './license-event';
import {Int} from './int';

export interface UnlicensedVirtualMachinesEvent extends LicenseEvent {
  available: Int;
  unlicensed: Int;
}
