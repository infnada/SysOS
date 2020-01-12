import {VimFault} from './vim-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface InvalidFolder extends VimFault {
  target: ManagedObjectReference & { $type: 'ManagedEntity' };
}
