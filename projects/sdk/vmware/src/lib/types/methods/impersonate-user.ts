import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ImpersonateUser {
  _this: ManagedObjectReference;
  userName: string;
  locale?: string;
}