import {DynamicData} from './dynamic-data';


export interface PerformanceManagerCounterLevelMapping extends DynamicData {
  aggregateLevel?: number;
  counterId: number;
  perDeviceLevel?: number;
}