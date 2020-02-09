import {VimFault} from './vim-fault';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface EVCConfigFault extends VimFault {
  faults?: LocalizedMethodFault[];
}