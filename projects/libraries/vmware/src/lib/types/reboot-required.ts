import {VimFault} from './vim-fault';

export interface RebootRequired extends VimFault {
  patch?: string;
}
