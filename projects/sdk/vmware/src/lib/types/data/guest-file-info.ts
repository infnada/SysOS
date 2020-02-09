import {DynamicData} from './dynamic-data';

import {GuestFileAttributes} from './guest-file-attributes';

export interface GuestFileInfo extends DynamicData {
  attributes: GuestFileAttributes;
  path: string;
  size: number;
  type: string;
}