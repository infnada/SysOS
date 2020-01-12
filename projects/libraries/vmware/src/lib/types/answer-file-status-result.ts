import {DynamicData} from './dynamic-data';

import {AnswerFileStatusError} from './answer-file-status-error';
import {ManagedObjectReference} from './managed-object-reference';
import {DateTime} from './date-time';
export interface AnswerFileStatusResult extends DynamicData {
  checkedTime: DateTime;
  error?: AnswerFileStatusError[];
  host: ManagedObjectReference & { $type: 'HostSystem' };
  status: string;
}
