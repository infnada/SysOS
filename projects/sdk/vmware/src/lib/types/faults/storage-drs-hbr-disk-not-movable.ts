import {VimFault} from './vim-fault';


export interface StorageDrsHbrDiskNotMovable extends VimFault {
  nonMovableDiskIds: string;
}