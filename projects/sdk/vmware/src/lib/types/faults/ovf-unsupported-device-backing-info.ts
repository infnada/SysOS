import {OvfSystemFault} from './ovf-system-fault';


export interface OvfUnsupportedDeviceBackingInfo extends OvfSystemFault {
  backingName?: string;
  deviceName: string;
  elementName?: string;
  instanceId?: string;
}