import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ExecuteSimpleCommand {
  _this: ManagedObjectReference;
  arguments?: string[];
}