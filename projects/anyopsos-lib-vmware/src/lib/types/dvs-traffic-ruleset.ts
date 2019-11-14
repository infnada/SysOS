import {DynamicData} from './dynamic-data';

import {DvsTrafficRule} from './dvs-traffic-rule';
import {Int} from './int';
export interface DvsTrafficRuleset extends DynamicData {
  enabled?: boolean;
  key?: string;
  precedence?: Int;
  rules?: DvsTrafficRule[];
}
