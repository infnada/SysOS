import {DynamicData} from './dynamic-data';

export interface HostPatchManagerLocator extends DynamicData {
  proxy?: string;
  url: string;
}
