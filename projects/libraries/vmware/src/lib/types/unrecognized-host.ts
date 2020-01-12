import {VimFault} from './vim-fault';

export interface UnrecognizedHost extends VimFault {
  hostName: string;
}
