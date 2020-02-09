import {DynamicData} from './dynamic-data';

import {HostVmfsRescanResult} from './host-vmfs-rescan-result';
import {ManagedObjectReference} from './managed-object-reference';

export interface HostResignatureRescanResult extends DynamicData {
  rescan?: HostVmfsRescanResult[];
  result: ManagedObjectReference & { $type: 'Datastore'; };
}