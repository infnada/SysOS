import {DynamicData} from './dynamic-data';
import {DateTime} from './date-time';

export interface LocalizationManagerMessageCatalog extends DynamicData {
  catalogName: string;
  catalogUri: string;
  lastModified?: DateTime;
  locale: string;
  moduleName: string;
  version?: string;
}
