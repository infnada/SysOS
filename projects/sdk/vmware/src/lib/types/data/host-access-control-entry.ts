import {DynamicData} from './dynamic-data';

import {HostAccessMode} from '../enums/host-access-mode';

export interface HostAccessControlEntry extends DynamicData {
  accessMode: HostAccessMode;
  group: boolean;
  principal: string;
}