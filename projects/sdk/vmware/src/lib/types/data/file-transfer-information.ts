import {DynamicData} from './dynamic-data';

import {GuestFileAttributes} from './guest-file-attributes';

export interface FileTransferInformation extends DynamicData {
  attributes: GuestFileAttributes;
  size: number;
  url: string;
}