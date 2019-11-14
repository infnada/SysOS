import {VimFault} from './vim-fault';

import {Event} from './event';
export interface DasConfigFault extends VimFault {
  event?: Event[];
  output?: string;
  reason?: string;
}
