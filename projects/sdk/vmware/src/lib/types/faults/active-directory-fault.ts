import {VimFault} from './vim-fault';


export interface ActiveDirectoryFault extends VimFault {
  errorCode?: number;
}