import {VimFault} from './vim-fault';

import {ManagedObjectReference} from './managed-object-reference';
import {ManagedObjectReference} from './managed-object-reference';
export interface IORMNotSupportedHostOnDatastore extends VimFault {
  datastore: ManagedObjectReference & { $type: 'Datastore' };
  datastoreName: string;
  host?: ManagedObjectReference[] & { $type: 'HostSystem[]' };
}
