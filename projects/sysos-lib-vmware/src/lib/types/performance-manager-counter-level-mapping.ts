import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface PerformanceManagerCounterLevelMapping extends DynamicData {
  aggregateLevel?: Int;
  counterId?: Int;
}
