import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpgradeVmfs {
  _this: ManagedObjectReference;
  vmfsPath: string;
}