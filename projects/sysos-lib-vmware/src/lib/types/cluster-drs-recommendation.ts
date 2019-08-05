import {DynamicData} from './dynamic-data';

import {ClusterDrsMigration} from './cluster-drs-migration';
import {Int} from './int';
export interface ClusterDrsRecommendation extends DynamicData {
  key: string;
  migrationList: ClusterDrsMigration[];
  rating: Int;
  reason: string;
  reasonText: string;
}
