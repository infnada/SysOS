import {DynamicData} from './dynamic-data';

export interface VslmTagEntry extends DynamicData {
  parentCategoryName: string;
  tagName: string;
}
