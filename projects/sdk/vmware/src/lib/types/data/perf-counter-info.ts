import {DynamicData} from './dynamic-data';

import {ElementDescription} from './element-description';
import {PerfSummaryType} from '../enums/perf-summary-type';
import {PerfStatsType} from '../enums/perf-stats-type';

export interface PerfCounterInfo extends DynamicData {
  associatedCounterId?: number[];
  groupInfo: ElementDescription;
  key: number;
  level?: number;
  nameInfo: ElementDescription;
  perDeviceLevel?: number;
  rollupType: PerfSummaryType;
  statsType: PerfStatsType;
  unitInfo: ElementDescription;
}