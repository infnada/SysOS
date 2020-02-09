import {ManagedObjectReference} from '../data/managed-object-reference';


export interface UpgradeVsanObjects {
  _this: ManagedObjectReference;
  uuids: string[];
  newVersion: number;
}