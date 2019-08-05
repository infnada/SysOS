import {VimFault} from './vim-fault';

import {LocalizedMethodFault} from './localized-method-fault';
export interface EVCConfigFault extends VimFault {
  faults?: LocalizedMethodFault[];
}
