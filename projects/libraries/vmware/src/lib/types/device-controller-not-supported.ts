import {DeviceNotSupported} from './device-not-supported';

export interface DeviceControllerNotSupported extends DeviceNotSupported {
  controller: string;
}
