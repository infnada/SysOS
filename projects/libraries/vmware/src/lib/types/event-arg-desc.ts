import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';
export interface EventArgDesc extends DynamicData {
  description?: ElementDescription;
  name: string;
  type: string;
}
