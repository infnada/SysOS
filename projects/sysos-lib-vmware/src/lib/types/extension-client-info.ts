import {DynamicData} from './dynamic-data';

import {Description} from './description';
export interface ExtensionClientInfo extends DynamicData {
  company: string;
  description: Description;
  type: string;
  url: string;
  version: string;
}
