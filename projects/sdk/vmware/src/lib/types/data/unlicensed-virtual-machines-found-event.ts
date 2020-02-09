import {LicenseEvent} from './license-event';


export interface UnlicensedVirtualMachinesFoundEvent extends LicenseEvent {
  available: number;
}