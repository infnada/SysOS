import {VimFault} from './vim-fault';
import {Long} from './long';

export interface InsufficientStorageIops extends VimFault {
  datastoreName: string;
  requestedIops: Long;
  unreservedIops: Long;
}
