import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';
export interface AuthorizationDescription extends DynamicData {
  privilege: ElementDescription[];
  privilegeGroup: ElementDescription[];
}
