import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryAnswerFileStatus {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem[]'; };
}