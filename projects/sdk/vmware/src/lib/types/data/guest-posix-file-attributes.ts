import {GuestFileAttributes} from './guest-file-attributes';


export interface GuestPosixFileAttributes extends GuestFileAttributes {
  groupId?: number;
  ownerId?: number;
  permissions?: number;
}