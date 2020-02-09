import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryChangedDiskAreas {
  _this: ManagedObjectReference;
  snapshot?: ManagedObjectReference & { $type: 'VirtualMachineSnapshot'; };
  deviceKey: number;
  startOffset: number;
  changeId: string;
}