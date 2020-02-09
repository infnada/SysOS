import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface VirtualMachineFileLayoutSnapshotLayout extends DynamicData {
  key: ManagedObjectReference & { $type: 'VirtualMachineSnapshot'; };
  snapshotFile: string[];
}