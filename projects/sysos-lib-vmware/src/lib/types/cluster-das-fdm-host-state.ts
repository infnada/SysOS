import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface ClusterDasFdmHostState extends DynamicData {
  state: string;
  stateReporter?: ManagedObjectReference & { $type: 'HostSystem' };
}
