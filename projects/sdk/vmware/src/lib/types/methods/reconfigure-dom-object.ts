import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ReconfigureDomObject {
  _this: ManagedObjectReference;
  uuid: string;
  policy: string;
}