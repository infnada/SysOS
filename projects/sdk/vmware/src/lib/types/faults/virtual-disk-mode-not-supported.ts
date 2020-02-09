import {DeviceNotSupported} from './device-not-supported';


export interface VirtualDiskModeNotSupported extends DeviceNotSupported {
  mode: string;
}