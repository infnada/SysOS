import {DynamicData} from './dynamic-data';

import {Description} from './description';
import {Int} from './int';
export interface AuthorizationRole extends DynamicData {
  info: Description;
  name: string;
  privilege?: string[];
  roleId: Int;
  system: boolean;
}
