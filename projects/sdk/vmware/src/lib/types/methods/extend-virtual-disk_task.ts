import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ExtendVirtualDisk_Task {
  _this: ManagedObjectReference;
  name: string;
  datacenter?: ManagedObjectReference & { $type: 'Datacenter'; };
  newCapacityKb: number;
  eagerZero?: boolean;
}