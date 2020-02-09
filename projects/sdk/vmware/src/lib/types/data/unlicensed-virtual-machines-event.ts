import {LicenseEvent} from './license-event';


export interface UnlicensedVirtualMachinesEvent extends LicenseEvent {
  available: number;
  unlicensed: number;
}