import {VimFault} from './vim-fault';
import {Int} from './int';

export interface NamespaceLimitReached extends VimFault {
  limit?: Int;
}
