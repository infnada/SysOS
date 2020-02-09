import {ManagedObjectReference} from '../data/managed-object-reference';


export interface JoinDomainWithCAM_Task {
  _this: ManagedObjectReference;
  domainName: string;
  camServer: string;
}