import {VimFault} from './vim-fault';
import {Int} from './int';

export interface ShrinkDiskFault extends VimFault {
  diskId?: Int;
}
