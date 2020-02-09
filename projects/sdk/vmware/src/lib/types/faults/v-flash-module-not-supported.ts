import {VmConfigFault} from './vm-config-fault';


export interface VFlashModuleNotSupported extends VmConfigFault {
  hostName: string;
  moduleName: string;
  reason: string;
  vmName: string;
}