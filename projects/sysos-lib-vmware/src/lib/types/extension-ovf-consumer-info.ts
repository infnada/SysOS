import {DynamicData} from './dynamic-data';

export interface ExtensionOvfConsumerInfo extends DynamicData {
  callbackUrl: string;
  sectionType: string[];
}
