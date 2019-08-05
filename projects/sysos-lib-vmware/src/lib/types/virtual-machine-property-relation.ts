import {DynamicData} from './dynamic-data';

import {DynamicProperty} from './dynamic-property';
import {DynamicProperty} from './dynamic-property';
export interface VirtualMachinePropertyRelation extends DynamicData {
  key: DynamicProperty;
  relations?: DynamicProperty[];
}
