import {ManagedObjectReference} from '../data/managed-object-reference';


export interface CheckAnswerFileStatus_Task {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem[]'; };
}