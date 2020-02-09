import {InvalidVmConfig} from './invalid-vm-config';


export interface InvalidDeviceSpec extends InvalidVmConfig {
  deviceIndex: number;
}