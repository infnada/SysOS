import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';

export interface HostSystemIdentificationInfo extends DynamicData {
  identifierType: ElementDescription;
  identifierValue: string;
}