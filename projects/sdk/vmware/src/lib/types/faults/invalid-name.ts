import {VimFault} from './vim-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface InvalidName extends VimFault {
  entity?: ManagedObjectReference & { $type: 'ManagedEntity'; };
  name: string;
}