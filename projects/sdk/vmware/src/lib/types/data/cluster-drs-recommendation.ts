import {DynamicData} from './dynamic-data';

import {ClusterDrsMigration} from './cluster-drs-migration';

export interface ClusterDrsRecommendation extends DynamicData {
  key: string;
  migrationList: ClusterDrsMigration[];
  rating: number;
  reason: string;
  reasonText: string;
}