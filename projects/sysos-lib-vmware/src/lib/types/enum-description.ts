import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';
export interface EnumDescription extends DynamicData {
  key: string;
  tags: ElementDescription[];
}
