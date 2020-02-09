import {ManagedObjectReference} from '../data/managed-object-reference';
import {PerfQuerySpec} from '../data/perf-query-spec';


export interface QueryPerf {
  _this: ManagedObjectReference;
  querySpec: PerfQuerySpec[];
}