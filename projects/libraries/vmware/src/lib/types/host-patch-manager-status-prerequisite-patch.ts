import {DynamicData} from './dynamic-data';

export interface HostPatchManagerStatusPrerequisitePatch extends DynamicData {
  id: string;
  installState?: string[];
}
