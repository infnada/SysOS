import {VimFault} from './vim-fault';
import {Int} from './int';

export interface ActiveDirectoryFault extends VimFault {
  errorCode?: Int;
}
