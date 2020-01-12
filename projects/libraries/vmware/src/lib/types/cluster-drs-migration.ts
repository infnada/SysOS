import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
import {DateTime} from './date-time';
import {Long} from './long';
export interface ClusterDrsMigration extends DynamicData {
  cpuLoad?: Int;
  destination: ManagedObjectReference & { $type: 'HostSystem' };
  destinationCpuLoad?: Int;
  destinationMemoryLoad?: Long;
  key: string;
  memoryLoad?: Long;
  source: ManagedObjectReference & { $type: 'HostSystem' };
  sourceCpuLoad?: Int;
  sourceMemoryLoad?: Long;
  time: DateTime;
  vm: ManagedObjectReference & { $type: 'VirtualMachine' };
}
