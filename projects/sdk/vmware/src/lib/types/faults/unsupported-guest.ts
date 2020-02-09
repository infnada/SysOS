import {InvalidVmConfig} from './invalid-vm-config';


export interface UnsupportedGuest extends InvalidVmConfig {
  unsupportedGuestOS: string;
}