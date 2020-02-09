import {VimFault} from './vim-fault';


export interface NamespaceLimitReached extends VimFault {
  limit?: number;
}