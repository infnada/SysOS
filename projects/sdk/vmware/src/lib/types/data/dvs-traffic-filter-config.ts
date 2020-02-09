import {DvsFilterConfig} from './dvs-filter-config';

import {DvsTrafficRuleset} from './dvs-traffic-ruleset';

export interface DvsTrafficFilterConfig extends DvsFilterConfig {
  trafficRuleset?: DvsTrafficRuleset;
}