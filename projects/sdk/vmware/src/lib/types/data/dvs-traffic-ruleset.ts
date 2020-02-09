import {DynamicData} from './dynamic-data';

import {DvsTrafficRule} from './dvs-traffic-rule';

export interface DvsTrafficRuleset extends DynamicData {
  enabled?: boolean;
  key?: string;
  precedence?: number;
  rules?: DvsTrafficRule[];
}