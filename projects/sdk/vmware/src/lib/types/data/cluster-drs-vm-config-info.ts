import {DynamicData} from './dynamic-data';

import {DrsBehavior} from '../enums/drs-behavior';
import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterDrsVmConfigInfo extends DynamicData {
  behavior?: DrsBehavior;
  enabled?: boolean;
  key: ManagedObjectReference & { $type: 'VirtualMachine'; };
}