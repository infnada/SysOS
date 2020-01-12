import {VimFault} from './vim-fault';

import {KeyValue} from './key-value';
export interface ExtendedFault extends VimFault {
  data?: KeyValue[];
  faultTypeId: string;
}
