import {VimFault} from './vim-fault';

export interface NamespaceWriteProtected extends VimFault {
  name: string;
}
