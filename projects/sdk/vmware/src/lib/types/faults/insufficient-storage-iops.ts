import {VimFault} from './vim-fault';


export interface InsufficientStorageIops extends VimFault {
  datastoreName: string;
  requestedIops: number;
  unreservedIops: number;
}