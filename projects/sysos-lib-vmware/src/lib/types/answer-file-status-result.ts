import {DateTime} from "./date-time";
import {AnswerFileStatusError} from "./answer-file-status-error";
import {ManagedObjectReference} from "./managed-object-reference";

export interface AnswerFileStatusResult {
  checkedTime: DateTime;
  error?: AnswerFileStatusError[];
  host: ManagedObjectReference & { $type: 'HostSystem' };
  status: string;
}
