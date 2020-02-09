import {VirtualDevicePipeBackingInfo} from './virtual-device-pipe-backing-info';


export interface VirtualSerialPortPipeBackingInfo extends VirtualDevicePipeBackingInfo {
  endpoint: string;
  noRxLoss?: boolean;
}