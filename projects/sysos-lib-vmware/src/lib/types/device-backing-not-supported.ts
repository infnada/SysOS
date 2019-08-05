import {DeviceNotSupported} from './device-not-supported';

export interface DeviceBackingNotSupported extends DeviceNotSupported {
  backing: string;
}
