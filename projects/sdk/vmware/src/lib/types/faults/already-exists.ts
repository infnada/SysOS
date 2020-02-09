import {VimFault} from './vim-fault';


export interface AlreadyExists extends VimFault {
  name?: string;
}