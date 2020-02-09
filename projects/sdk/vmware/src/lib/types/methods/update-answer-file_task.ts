import {ManagedObjectReference} from '../data/managed-object-reference';
import {AnswerFileCreateSpec} from '../data/answer-file-create-spec';


export interface UpdateAnswerFile_Task {
  _this: ManagedObjectReference;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  configSpec: AnswerFileCreateSpec;
}