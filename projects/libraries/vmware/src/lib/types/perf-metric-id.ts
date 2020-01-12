import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface PerfMetricId extends DynamicData {
  counterId: Int;
  instance: string;
}
