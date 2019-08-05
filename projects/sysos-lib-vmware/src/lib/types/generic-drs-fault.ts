import {VimFault} from './vim-fault';

import {LocalizedMethodFault} from './localized-method-fault';
export interface GenericDrsFault extends VimFault {
  hostFaults?: LocalizedMethodFault[];
}
