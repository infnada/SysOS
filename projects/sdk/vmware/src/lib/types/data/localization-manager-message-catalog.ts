import {DynamicData} from './dynamic-data';


export interface LocalizationManagerMessageCatalog extends DynamicData {
  catalogName: string;
  catalogUri: string;
  lastModified?: string;
  locale: string;
  md5sum?: string;
  moduleName: string;
  version?: string;
}