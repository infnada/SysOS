import {ManagedObjectReference} from '../data/managed-object-reference';
import {VirtualDisk} from '../data/virtual-disk';


export interface PromoteDisks_Task {
  _this: ManagedObjectReference;
  unlink: boolean;
  disks?: VirtualDisk[];
}