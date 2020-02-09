import {DynamicData} from './dynamic-data';

import {Description} from './description';

export interface AuthorizationRole extends DynamicData {
  info: Description;
  name: string;
  privilege?: string[];
  roleId: number;
  system: boolean;
}