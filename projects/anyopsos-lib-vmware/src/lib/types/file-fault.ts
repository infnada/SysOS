import {VimFault} from './vim-fault';

export interface FileFault extends VimFault {
  file: string;
}
