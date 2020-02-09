import {ManagedObjectReference} from '../data/managed-object-reference';
import {StructuredCustomizations} from '../data/structured-customizations';


export interface GenerateHostConfigTaskSpec_Task {
  _this: ManagedObjectReference;
  hostsInfo?: StructuredCustomizations[];
}