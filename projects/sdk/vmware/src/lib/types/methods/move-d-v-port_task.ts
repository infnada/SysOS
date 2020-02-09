import {ManagedObjectReference} from '../data/managed-object-reference';


export interface MoveDVPort_Task {
  _this: ManagedObjectReference;
  portKey: string[];
  destinationPortgroupKey?: string;
}