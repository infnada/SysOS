import {VimFault} from './vim-fault';


export interface HostIncompatibleForRecordReplay extends VimFault {
  hostName?: string;
  reason?: string;
}