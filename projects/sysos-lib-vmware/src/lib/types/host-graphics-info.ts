import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Long} from './long';
export interface HostGraphicsInfo extends DynamicData {
  deviceName: string;
  graphicsType: string;
  memorySizeInKB: Long;
  pciId: string;
  vendorName: string;
  vm?: ManagedObjectReference[] & { $type: 'VirtualMachine' };
}
