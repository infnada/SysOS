import {DynamicData} from './dynamic-data';

import {HostPatchManagerStatusPrerequisitePatch} from './host-patch-manager-status-prerequisite-patch';

export interface HostPatchManagerStatus extends DynamicData {
  applicable: boolean;
  id: string;
  installed: boolean;
  installState?: string[];
  integrity?: string;
  prerequisitePatch?: HostPatchManagerStatusPrerequisitePatch[];
  reason?: string[];
  reconnectRequired: boolean;
  restartRequired: boolean;
  supersededPatchIds?: string[];
  vmOffRequired: boolean;
}