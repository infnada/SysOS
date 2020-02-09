import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';

export interface PerformanceDescription extends DynamicData {
  counterType: ElementDescription[];
  statsType: ElementDescription[];
}