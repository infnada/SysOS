import {ManagedObjectReference} from '../data/managed-object-reference';
import {PerfInterval} from '../data/perf-interval';


export interface CreatePerfInterval {
  _this: ManagedObjectReference;
  intervalId: PerfInterval;
}