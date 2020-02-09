import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RestoreFirmwareConfiguration {
  _this: ManagedObjectReference;
  force: boolean;
}