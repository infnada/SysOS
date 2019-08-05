import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';
import {TypeDescription} from './type-description';
export interface TaskDescription extends DynamicData {
  methodInfo: ElementDescription[];
  reason: TypeDescription[];
  state: ElementDescription[];
}
