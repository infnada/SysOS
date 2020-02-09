import {VimFault} from './vim-fault';

import {Event} from '../data/event';

export interface DasConfigFault extends VimFault {
  event?: Event[];
  output?: string;
  reason?: string;
}