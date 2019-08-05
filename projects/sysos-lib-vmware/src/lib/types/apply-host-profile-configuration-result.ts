import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
import {DateTime} from './date-time';
export interface ApplyHostProfileConfigurationResult extends DynamicData {
  completeTime: DateTime;
  errors?: LocalizedMethodFault[];
  host: ManagedObjectReference & { $type: 'HostSystem' };
  startTime: DateTime;
  status: string;
}
