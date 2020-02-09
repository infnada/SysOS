import {DynamicData} from './dynamic-data';

import {ManagedObjectReference} from './managed-object-reference';

export interface VAppEntityConfigInfo extends DynamicData {
  destroyWithParent?: boolean;
  key?: ManagedObjectReference & { $type: 'ManagedEntity'; };
  startAction?: string;
  startDelay?: number;
  startOrder?: number;
  stopAction?: string;
  stopDelay?: number;
  tag?: string;
  waitingForGuest?: boolean;
}