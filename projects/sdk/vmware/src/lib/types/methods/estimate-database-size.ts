import {ManagedObjectReference} from '../data/managed-object-reference';
import {DatabaseSizeParam} from '../data/database-size-param';


export interface EstimateDatabaseSize {
  _this: ManagedObjectReference;
  dbSizeParam: DatabaseSizeParam;
}