import {ManagedObjectReference} from '../data/managed-object-reference';


export interface QueryAvailablePerfMetric {
  _this: ManagedObjectReference;
  entity: ManagedObjectReference;
  beginTime?: string;
  endTime?: string;
  intervalId?: number;
}