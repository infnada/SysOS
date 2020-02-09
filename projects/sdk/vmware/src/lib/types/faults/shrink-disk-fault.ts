import {VimFault} from './vim-fault';


export interface ShrinkDiskFault extends VimFault {
  diskId?: number;
}