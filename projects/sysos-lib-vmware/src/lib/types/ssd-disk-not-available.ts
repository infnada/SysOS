import {VimFault} from './vim-fault';

export interface SsdDiskNotAvailable extends VimFault {
  devicePath: string;
}
