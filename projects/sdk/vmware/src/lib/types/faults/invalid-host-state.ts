import {InvalidState} from './invalid-state';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface InvalidHostState extends InvalidState {
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}