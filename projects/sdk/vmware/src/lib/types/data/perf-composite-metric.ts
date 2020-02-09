import {DynamicData} from './dynamic-data';

import {PerfEntityMetricBase} from './perf-entity-metric-base';

export interface PerfCompositeMetric extends DynamicData {
  childEntity?: PerfEntityMetricBase[];
  entity?: PerfEntityMetricBase;
}