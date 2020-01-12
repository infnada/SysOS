import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface HostEsxAgentHostManagerConfigInfo extends DynamicData {
  agentVmDatastore?: ManagedObjectReference & { $type: 'Datastore' };
  agentVmNetwork?: ManagedObjectReference & { $type: 'Network' };
}
