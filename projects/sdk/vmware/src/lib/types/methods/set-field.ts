import {ManagedObjectReference} from '../data/managed-object-reference';


export interface SetField {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  key: number;
  value: string;
}