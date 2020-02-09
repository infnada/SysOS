import {VsanFault} from './vsan-fault';


export interface VsanDiskFault extends VsanFault {
  device?: string;
}