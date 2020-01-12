import {DynamicData} from './dynamic-data';

import {HostMemberRuntimeInfo} from './host-member-runtime-info';
import {DvsResourceRuntimeInfo} from './dvs-resource-runtime-info';
export interface DVSRuntimeInfo extends DynamicData {
  hostMemberRuntime?: HostMemberRuntimeInfo[];
  resourceRuntimeInfo?: DvsResourceRuntimeInfo;
}
