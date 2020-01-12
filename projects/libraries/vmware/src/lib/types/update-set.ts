import {DynamicData} from './dynamic-data';

import {PropertyFilterUpdate} from './property-filter-update';
export interface UpdateSet extends DynamicData {
  filterSet?: PropertyFilterUpdate[];
  truncated?: boolean;
  version: string;
}
