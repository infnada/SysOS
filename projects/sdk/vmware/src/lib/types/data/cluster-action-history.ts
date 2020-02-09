import {DynamicData} from './dynamic-data';

import {ClusterAction} from './cluster-action';

export interface ClusterActionHistory extends DynamicData {
  action: ClusterAction;
  time: string;
}