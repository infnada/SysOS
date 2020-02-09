import {VimFault} from './vim-fault';

import {KeyValue} from '../data/key-value';

export interface ExtendedFault extends VimFault {
  data?: KeyValue[];
  faultTypeId: string;
}