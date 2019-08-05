import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface StorageDrsSpaceLoadBalanceConfig extends DynamicData {
  freeSpaceThresholdGB?: Int;
  minSpaceUtilizationDifference?: Int;
  spaceThresholdMode?: string;
  spaceUtilizationThreshold?: Int;
}
