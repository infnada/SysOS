import {VimFault} from './vim-fault';

export interface NetworkDisruptedAndConfigRolledBack extends VimFault {
  host: string;
}
