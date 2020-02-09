import {ManagedObjectReference} from '../data/managed-object-reference';
import {PerformanceManagerCounterLevelMapping} from '../data/performance-manager-counter-level-mapping';


export interface UpdateCounterLevelMapping {
  _this: ManagedObjectReference;
  counterLevelMap: PerformanceManagerCounterLevelMapping[];
}