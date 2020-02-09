import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterDasAamNodeState extends DynamicData {
  configState: string;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  name: string;
  runtimeState: string;
}