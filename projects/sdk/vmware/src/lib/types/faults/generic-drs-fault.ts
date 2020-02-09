import {VimFault} from './vim-fault';

import {LocalizedMethodFault} from '../data/localized-method-fault';

export interface GenericDrsFault extends VimFault {
  hostFaults?: LocalizedMethodFault[];
}