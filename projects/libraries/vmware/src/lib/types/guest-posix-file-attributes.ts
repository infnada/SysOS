import {GuestFileAttributes} from './guest-file-attributes';
import {Int} from './int';
import {Long} from './long';

export interface GuestPosixFileAttributes extends GuestFileAttributes {
  groupId?: Int;
  ownerId?: Int;
  permissions?: Long;
}
