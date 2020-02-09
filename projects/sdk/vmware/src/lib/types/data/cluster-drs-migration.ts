import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface ClusterDrsMigration extends DynamicData {
  cpuLoad?: number;
  destination: ManagedObjectReference & { $type: 'HostSystem'; };
  destinationCpuLoad?: number;
  destinationMemoryLoad?: number;
  key: string;
  memoryLoad?: number;
  source: ManagedObjectReference & { $type: 'HostSystem'; };
  sourceCpuLoad?: number;
  sourceMemoryLoad?: number;
  time: string;
  vm: ManagedObjectReference & { $type: 'VirtualMachine'; };
}