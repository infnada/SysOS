import {DynamicData} from './dynamic-data';

import {HostTargetTransport} from './host-target-transport';
export interface HostMultipathInfoPath extends DynamicData {
  adapter: string;
  isWorkingPath?: boolean;
  key: string;
  lun: string;
  name: string;
  pathState: string;
  state?: string;
  transport?: HostTargetTransport;
}
