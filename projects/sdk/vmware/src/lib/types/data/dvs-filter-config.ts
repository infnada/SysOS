import {InheritablePolicy} from './inheritable-policy';

import {DvsFilterParameter} from './dvs-filter-parameter';

export interface DvsFilterConfig extends InheritablePolicy {
  agentName?: string;
  key?: string;
  onFailure?: string;
  parameters?: DvsFilterParameter;
  slotNumber?: string;
}