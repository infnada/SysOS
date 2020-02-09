import {DynamicData} from './dynamic-data';


export interface PerfMetricId extends DynamicData {
  counterId: number;
  instance: string;
}