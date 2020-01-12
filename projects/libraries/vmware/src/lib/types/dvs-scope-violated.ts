import {DvsFault} from './dvs-fault';
import {ManagedObjectReference} from './managed-object-reference';

export interface DvsScopeViolated extends DvsFault {
  entity: ManagedObjectReference & { $type: 'ManagedEntity' };
  scope: ManagedObjectReference[] & { $type: 'ManagedEntity[]' };
}
