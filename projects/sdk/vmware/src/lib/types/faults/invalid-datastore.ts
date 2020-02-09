import {VimFault} from './vim-fault';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface InvalidDatastore extends VimFault {
  datastore?: ManagedObjectReference & { $type: 'Datastore'; };
  name?: string;
}