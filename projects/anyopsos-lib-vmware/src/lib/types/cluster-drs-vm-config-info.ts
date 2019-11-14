import {DynamicData} from './dynamic-data';

import {DrsBehavior} from './drs-behavior';
import {ManagedObjectReference} from './managed-object-reference';
export interface ClusterDrsVmConfigInfo extends DynamicData {
  behavior?: DrsBehavior;
  enabled?: boolean;
  key: ManagedObjectReference & { $type: 'VirtualMachine' };
}
