import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';
import {PerfSummaryType} from './perf-summary-type';
import {PerfStatsType} from './perf-stats-type';
import {Int} from './int';
export interface PerfCounterInfo extends DynamicData {
  associatedCounterId?: Int[];
  groupInfo: ElementDescription;
  key: Int;
  level?: Int;
  nameInfo: ElementDescription;
  perDeviceLevel?: Int;
  rollupType: PerfSummaryType;
  statsType: PerfStatsType;
  unitInfo: ElementDescription;
}
