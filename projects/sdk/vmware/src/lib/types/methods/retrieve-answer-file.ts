import {ManagedObjectReference} from '../data/managed-object-reference';


export interface RetrieveAnswerFile {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
}