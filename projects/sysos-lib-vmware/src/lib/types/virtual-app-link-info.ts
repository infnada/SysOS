import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
export interface VirtualAppLinkInfo extends DynamicData {
  destroyWithParent?: boolean;
  key: ManagedObjectReference & { $type: 'ManagedEntity' };
}
