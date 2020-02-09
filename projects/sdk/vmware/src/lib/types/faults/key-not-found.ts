import {VimFault} from './vim-fault';


export interface KeyNotFound extends VimFault {
  key: string;
}