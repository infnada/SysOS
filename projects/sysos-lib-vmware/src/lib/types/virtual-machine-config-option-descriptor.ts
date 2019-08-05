import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface VirtualMachineConfigOptionDescriptor extends DynamicData {
  createSupported: boolean;
  defaultConfigOption: boolean;
  description?: string;
  host?: ManagedObjectReference[] & { $type: 'HostSystem' };
  key: string;
  runSupported: boolean;
  upgradeSupported: boolean;
}
