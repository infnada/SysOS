import {VimFault} from './vim-fault';

export interface InvalidPrivilege extends VimFault {
  privilege: string;
}
