import {DynamicData} from './dynamic-data';

import {AnswerFileStatusError} from './answer-file-status-error';
import {ManagedObjectReference} from './managed-object-reference';

export interface AnswerFileStatusResult extends DynamicData {
  checkedTime: string;
  error?: AnswerFileStatusError[];
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  status: string;
}