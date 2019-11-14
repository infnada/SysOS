import {VimFault} from './vim-fault';

export interface OutOfBounds extends VimFault {
  argumentName: string;
}
