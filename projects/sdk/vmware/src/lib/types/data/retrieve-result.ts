import {DynamicData} from './dynamic-data';

import {ObjectContent} from './object-content';

export interface RetrieveResult extends DynamicData {
  objects: ObjectContent[];
  token?: string;
}