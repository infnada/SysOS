import {DynamicData} from './dynamic-data';


export interface StorageDrsSpaceLoadBalanceConfig extends DynamicData {
  freeSpaceThresholdGB?: number;
  minSpaceUtilizationDifference?: number;
  spaceThresholdMode?: string;
  spaceUtilizationThreshold?: number;
}