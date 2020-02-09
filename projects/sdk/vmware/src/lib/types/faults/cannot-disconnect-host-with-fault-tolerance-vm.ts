import {VimFault} from './vim-fault';


export interface CannotDisconnectHostWithFaultToleranceVm extends VimFault {
  hostName: string;
}