import {DynamicData} from './dynamic-data';

export interface ClusterInfraUpdateHaConfigInfo extends DynamicData {
  behavior?: string;
  enabled?: boolean;
  moderateRemediation?: string;
  providers?: string[];
  severeRemediation?: string;
}
