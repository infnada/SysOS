import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {EventFilterSpecRecursionOption} from '../enums/event-filter-spec-recursion-option';

export interface EventFilterSpecByEntity extends DynamicData {
  entity: ManagedObjectReference & { $type: 'ManagedEntity'; };
  recursion: EventFilterSpecRecursionOption;
}