import {DynamicData} from './dynamic-data';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';

export interface ApplyHostProfileConfigurationResult extends DynamicData {
  completeTime: string;
  errors?: LocalizedMethodFault[];
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  startTime: string;
  status: string;
}