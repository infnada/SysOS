import {ManagedObjectReference} from '../data/managed-object-reference';


export interface PowerDownHostToStandBy_Task {
  _this: ManagedObjectReference;
  timeoutSec: number;
  evacuatePoweredOffVms?: boolean;
}