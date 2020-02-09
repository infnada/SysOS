import {GuestFileAttributes} from './guest-file-attributes';


export interface GuestWindowsFileAttributes extends GuestFileAttributes {
  createTime?: string;
  hidden?: boolean;
  readOnly?: boolean;
}