import {DynamicData} from './dynamic-data';
import {ManagedObjectReference} from './managed-object-reference';

export interface DistributedVirtualSwitchPortCriteria extends DynamicData {
  active?: boolean;
  connected?: boolean;
  host?: ManagedObjectReference[] & { $type: 'HostSystem' };
  inside?: boolean;
  portgroupKey?: string[];
  portKey?: string[];
  scope?: ManagedObjectReference & { $type: 'ManagedEntity' };
  uplinkPort?: boolean;
}
