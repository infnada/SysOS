import {VimFault} from './vim-fault';

import {LocalizedMethodFault} from '../data/localized-method-fault';
import {ManagedObjectReference} from '../data/managed-object-reference';

export interface NoCompatibleHost extends VimFault {
  error?: LocalizedMethodFault[];
  host?: ManagedObjectReference & { $type: 'HostSystem[]'; };
}