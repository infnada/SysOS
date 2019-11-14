import {DynamicData} from './dynamic-data';

import {LocalizableMessage} from './localizable-message';
import {ManagedObjectReference} from './managed-object-reference';
export interface HostProfileManagerCompositionResultResultElement extends DynamicData {
  errors?: LocalizableMessage[];
  status: string;
  target: ManagedObjectReference & { $type: 'Profile' };
}
