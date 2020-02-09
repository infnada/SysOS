import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface HostGraphicsInfo extends DynamicData {
  deviceName: string;
  graphicsType: string;
  memorySizeInKB: number;
  pciId: string;
  vendorName: string;
  vm?: ManagedObjectReference & { $type: 'VirtualMachine[]'; };
}