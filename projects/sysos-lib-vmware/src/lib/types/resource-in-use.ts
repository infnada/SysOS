import {VimFault} from './vim-fault';

export interface ResourceInUse extends VimFault {
  name?: string;
  type?: string;
}
