import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';
import {Int} from './int';
export interface VAppEntityConfigInfo extends DynamicData {
  destroyWithParent?: boolean;
  key?: ManagedObjectReference & { $type: 'ManagedEntity' };
  startAction?: string;
  startDelay?: Int;
  startOrder?: Int;
  stopAction?: string;
  stopDelay?: Int;
  tag?: string;
  waitingForGuest?: boolean;
}
