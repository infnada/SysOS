import {VimFault} from './vim-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface DuplicateName extends VimFault {
  name: string;
  object: ManagedObjectReference;
}