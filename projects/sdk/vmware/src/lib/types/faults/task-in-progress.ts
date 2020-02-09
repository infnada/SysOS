import {VimFault} from './vim-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface TaskInProgress extends VimFault {
  task: ManagedObjectReference & { $type: 'Task'; };
}