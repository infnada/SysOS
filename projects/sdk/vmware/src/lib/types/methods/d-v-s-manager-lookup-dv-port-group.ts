import {ManagedObjectReference} from '../data/managed-object-reference';


export interface DVSManagerLookupDvPortGroup {
  _this: ManagedObjectReference;
  switchUuid: string;
  portgroupKey: string;
}