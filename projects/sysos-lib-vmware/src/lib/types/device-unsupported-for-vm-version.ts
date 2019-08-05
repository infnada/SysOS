import {InvalidDeviceSpec} from './invalid-device-spec';

export interface DeviceUnsupportedForVmVersion extends InvalidDeviceSpec {
  currentVersion: string;
  expectedVersion: string;
}
