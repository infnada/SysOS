import {DynamicData} from './dynamic-data';

export interface HostNetOffloadCapabilities extends DynamicData {
  csumOffload?: boolean;
  tcpSegmentation?: boolean;
  zeroCopyXmit?: boolean;
}
