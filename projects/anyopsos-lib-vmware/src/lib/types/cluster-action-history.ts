import {DynamicData} from './dynamic-data';

import {ClusterAction} from './cluster-action';
import {DateTime} from './date-time';
export interface ClusterActionHistory extends DynamicData {
  action: ClusterAction;
  time: DateTime;
}
