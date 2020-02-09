import {DynamicData} from './dynamic-data';

import {Description} from './description';

export interface ExtensionServerInfo extends DynamicData {
  adminEmail: string[];
  company: string;
  description: Description;
  serverThumbprint?: string;
  type: string;
  url: string;
}