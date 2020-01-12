import {GuestFileAttributes} from './guest-file-attributes';
import {DateTime} from './date-time';

export interface GuestWindowsFileAttributes extends GuestFileAttributes {
  createTime?: DateTime;
  hidden?: boolean;
  readOnly?: boolean;
}
