import {DynamicData} from './dynamic-data';

import {HostConfigSpec} from './host-config-spec';
import {LocalizableMessage} from './localizable-message';
export interface HostProfileManagerConfigTaskList extends DynamicData {
  configSpec?: HostConfigSpec;
  taskDescription?: LocalizableMessage[];
  taskListRequirement?: string[];
}
