import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Long} from './long';
export interface DvsVnicAllocatedResource extends DynamicData {
  reservation?: Long;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
  vnicKey: string;
}
