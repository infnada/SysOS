import {NotEnoughCpus} from './not-enough-cpus';

import {ManagedObjectReference} from './managed-object-reference';
export interface NotEnoughLogicalCpus extends NotEnoughCpus {
  host?: ManagedObjectReference & { $type: 'HostSystem' };
}
