import {DateTime} from "./date-time";
import {LocalizedMethodFault} from "./localized-method-fault";
import {ManagedObjectReference} from "./managed-object-reference";

export interface ApplyHostProfileConfigurationResult {
  completeTime: DateTime;
  errors?: LocalizedMethodFault[];
  host: ManagedObjectReference & { $type: 'HostSystem' };
  startTime: DateTime;
  status: string;
}
