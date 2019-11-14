import {DynamicData} from './dynamic-data';

import {HostPatchManagerStatus} from './host-patch-manager-status';
export interface HostPatchManagerResult extends DynamicData {
  status?: HostPatchManagerStatus[];
  version: string;
  xmlResult?: string;
}
