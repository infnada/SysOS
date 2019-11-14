import {InheritablePolicy} from './inheritable-policy';

import {DvsFilterConfig} from './dvs-filter-config';
export interface DvsFilterPolicy extends InheritablePolicy {
  filterConfig?: DvsFilterConfig[];
}
