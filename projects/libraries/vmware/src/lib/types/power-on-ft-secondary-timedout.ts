import {Timedout} from './timedout';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface PowerOnFtSecondaryTimedout extends Timedout {
  timeout: Int;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
  vmName: string;
}
