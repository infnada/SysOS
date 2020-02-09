import {ManagedObjectReference} from '../data/managed-object-reference';
import {VsanHostDiskMapping} from '../data/vsan-host-disk-mapping';


export interface InitializeDisks_Task {
  _this: ManagedObjectReference;
  mapping: VsanHostDiskMapping[];
}