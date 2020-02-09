import {ManagedObjectReference} from '../data/managed-object-reference';


export interface JoinDomain_Task {
  _this: ManagedObjectReference;
  domainName: string;
  userName: string;
  password: string;
}