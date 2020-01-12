import {DynamicData} from './dynamic-data';

import {OvfFile} from './ovf-file';
import {ManagedObjectReference} from './managed-object-reference';
export interface OvfCreateDescriptorParams extends DynamicData {
  description?: string;
  exportOption?: string[];
  includeImageFiles?: boolean;
  name?: string;
  ovfFiles?: OvfFile[];
  snapshot?: ManagedObjectReference & { $type: 'VirtualMachineSnapshot' };
}
