import {ManagedObjectReference} from '../data/managed-object-reference';


export interface Login {
  _this: ManagedObjectReference;
  userName: string;
  password: string;
  locale?: string;
}