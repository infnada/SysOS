import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface HostVMotionCompatibility extends DynamicData {
  compatibility?: string[];
  host: ManagedObjectReference & { $type: 'HostSystem' };
}
