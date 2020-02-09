import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DeleteVsanObjects {
  _this: ManagedObjectReference;
  uuids: string[];
  force?: boolean;
}