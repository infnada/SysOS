import {DynamicData} from './dynamic-data';

import {NetworkSummary} from './network-summary';

export interface HostConnectInfoNetworkInfo extends DynamicData {
  summary: NetworkSummary;
}