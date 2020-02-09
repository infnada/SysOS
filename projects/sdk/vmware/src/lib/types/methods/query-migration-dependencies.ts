import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryMigrationDependencies {
  _this: ManagedObjectReference;
  pnicDevice: string[];
}