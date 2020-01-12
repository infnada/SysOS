import {VimFault} from './vim-fault';

import {ManagedObjectReference} from './managed-object-reference';
export interface HostSpecificationOperationFailed extends VimFault {
  host: ManagedObjectReference & { $type: 'HostSystem' };
}
