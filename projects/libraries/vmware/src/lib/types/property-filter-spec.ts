import {DynamicData} from './dynamic-data';

import {ObjectSpec} from './object-spec';
import {PropertySpec} from './property-spec';
export interface PropertyFilterSpec extends DynamicData {
  objectSet: ObjectSpec[];
  propSet: PropertySpec[];
  reportMissingObjectsInResults?: boolean;
}
