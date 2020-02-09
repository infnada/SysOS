import {OvfConnectedDevice} from './ovf-connected-device';


export interface OvfConnectedDeviceFloppy extends OvfConnectedDevice {
  filename: string;
}