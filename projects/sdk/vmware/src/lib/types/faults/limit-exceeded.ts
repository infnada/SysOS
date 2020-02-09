import {VimFault} from './vim-fault';


export interface LimitExceeded extends VimFault {
  limit?: number;
  property?: string;
}