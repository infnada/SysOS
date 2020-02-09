import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryIoFilterIssues {
  _this: ManagedObjectReference;
  filterId: string;
  compRes: ManagedObjectReference & { $type: 'ComputeResource'; };
}