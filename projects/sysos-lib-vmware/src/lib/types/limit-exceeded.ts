import {VimFault} from './vim-fault';
import {Int} from './int';

export interface LimitExceeded extends VimFault {
  limit?: Int;
  property?: string;
}
