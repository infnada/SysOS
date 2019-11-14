import {VimFault} from './vim-fault';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
export interface NoCompatibleHost extends VimFault {
  error?: LocalizedMethodFault[];
  host?: ManagedObjectReference[] & { $type: 'HostSystem[]' };
}
