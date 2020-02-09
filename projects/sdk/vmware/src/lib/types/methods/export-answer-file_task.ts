import {ManagedObjectReference} from '../data/managed-object-reference';


export interface ExportAnswerFile_Task {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}