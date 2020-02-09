import {ProfileExecuteResult} from './profile-execute-result';

import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';
import {LocalizableMessage} from './localizable-message';

export interface ApplyHostProfileConfigurationSpec extends ProfileExecuteResult {
  faultData?: LocalizedMethodFault;
  host: ManagedObjectReference & { $type: 'HostSystem'; };
  rebootHost?: boolean;
  rebootStateless?: boolean;
  taskDescription?: LocalizableMessage[];
  taskListRequirement?: string[];
}