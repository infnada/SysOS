import {NotEnoughCpus} from './not-enough-cpus';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface NotEnoughLogicalCpus extends NotEnoughCpus {
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
}