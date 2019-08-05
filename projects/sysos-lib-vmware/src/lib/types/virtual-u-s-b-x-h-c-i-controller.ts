import {VirtualController} from './virtual-controller';

export interface VirtualUSBXHCIController extends VirtualController {
  autoConnectDevices?: boolean;
}
