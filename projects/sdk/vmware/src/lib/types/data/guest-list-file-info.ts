import {DynamicData} from './dynamic-data';

import {GuestFileInfo} from './guest-file-info';

export interface GuestListFileInfo extends DynamicData {
  files?: GuestFileInfo[];
  remaining: number;
}