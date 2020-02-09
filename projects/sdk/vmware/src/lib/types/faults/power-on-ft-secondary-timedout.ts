import {Timedout} from './timedout';

import {ManagedObjectReference} from '../data/managed-object-reference';

export interface PowerOnFtSecondaryTimedout extends Timedout {
  timeout: number;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
  vmName: string;
}