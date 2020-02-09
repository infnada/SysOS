import {OvfSystemFault} from './ovf-system-fault';


export interface OvfUnsupportedDeviceBackingOption extends OvfSystemFault {
  backingName?: string;
  deviceName: string;
  elementName?: string;
  instanceId?: string;
}