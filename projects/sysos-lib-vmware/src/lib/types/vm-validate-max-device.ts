import {VimFault} from './vim-fault';
import {Int} from './int';

export interface VmValidateMaxDevice extends VimFault {
  count: Int;
  device: string;
  max: Int;
}
