import {DynamicData} from './dynamic-data';

import {InventoryDescription} from './inventory-description';
import {PerformanceStatisticsDescription} from './performance-statistics-description';
export interface DatabaseSizeParam extends DynamicData {
  inventoryDesc: InventoryDescription;
  perfStatsDesc?: PerformanceStatisticsDescription;
}
