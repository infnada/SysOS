import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';
export interface HostHardwareElementInfo extends DynamicData {
  name: string;
  status: ElementDescription;
}
