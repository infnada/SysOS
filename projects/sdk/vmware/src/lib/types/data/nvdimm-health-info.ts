import {DynamicData} from './dynamic-data';


export interface NvdimmHealthInfo extends DynamicData {
  dimmLifespanPercentage: number;
  dimmTemperature: number;
  dimmTemperatureThreshold: number;
  esLifespanPercentage?: number;
  esTemperature?: number;
  esTemperatureThreshold?: number;
  healthInformation: string;
  healthStatus: string;
  spareBlocksPercentage: number;
  spareBlockThreshold: number;
  stateFlagInfo?: string[];
}