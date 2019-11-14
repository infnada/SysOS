import {VimFault} from './vim-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface InvalidName extends VimFault {
  entity?: ManagedObjectReference & { $type: 'ManagedEntity' };
  name: string;
}
