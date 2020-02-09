import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {LocalizedMethodFault} from './localized-method-fault';
import {ManagedObjectReference} from './managed-object-reference';

export interface FolderFailedHostResult extends DynamicData {
  context: LocalizableMessage;
  fault: LocalizedMethodFault;
  host?: ManagedObjectReference & { $type: 'HostSystem'; };
  hostName?: string;
}