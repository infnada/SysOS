import {ManagedObjectReference} from '../data/managed-object-reference';
import {PerfInterval} from '../data/perf-interval';


export interface UpdatePerfInterval {
  _this: ManagedObjectReference;
  interval: PerfInterval;
}