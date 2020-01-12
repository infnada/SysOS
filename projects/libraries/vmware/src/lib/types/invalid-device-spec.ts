import {InvalidVmConfig} from './invalid-vm-config';
import {Int} from './int';

export interface InvalidDeviceSpec extends InvalidVmConfig {
  deviceIndex: Int;
}
