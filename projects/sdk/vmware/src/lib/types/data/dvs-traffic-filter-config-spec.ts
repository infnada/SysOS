import {DvsTrafficFilterConfig} from './dvs-traffic-filter-config';


export interface DvsTrafficFilterConfigSpec extends DvsTrafficFilterConfig {
  operation: string;
}