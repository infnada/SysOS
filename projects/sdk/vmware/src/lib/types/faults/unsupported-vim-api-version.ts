import {VimFault} from './vim-fault';


export interface UnsupportedVimApiVersion extends VimFault {
  version?: string;
}