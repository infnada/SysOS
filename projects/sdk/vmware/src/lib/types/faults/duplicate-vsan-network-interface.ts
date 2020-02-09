import {VsanFault} from './vsan-fault';


export interface DuplicateVsanNetworkInterface extends VsanFault {
  device: string;
}