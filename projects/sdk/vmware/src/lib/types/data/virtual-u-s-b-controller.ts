import {VirtualController} from './virtual-controller';


export interface VirtualUSBController extends VirtualController {
  autoConnectDevices?: boolean;
  ehciEnabled?: boolean;
}