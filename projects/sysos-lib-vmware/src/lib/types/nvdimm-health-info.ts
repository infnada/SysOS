import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface NvdimmHealthInfo extends DynamicData {
  dimmLifespanPercentage: Int;
  dimmTemperature: Int;
  dimmTemperatureThreshold: Int;
  esLifespanPercentage?: Int;
  esTemperature?: Int;
  esTemperatureThreshold?: Int;
  healthInformation: string;
  healthStatus: string;
  spareBlocksPercentage: Int;
  spareBlockThreshold: Int;
  stateFlagInfo?: string[];
}
