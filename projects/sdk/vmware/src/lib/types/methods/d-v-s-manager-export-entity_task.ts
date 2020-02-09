import {ManagedObjectReference} from '../data/managed-object-reference';
import {SelectionSet} from '../data/selection-set';


export interface DVSManagerExportEntity_Task {
  _this: ManagedObjectReference;
  selectionSet: SelectionSet[];
}