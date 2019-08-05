import {HostAccountSpec} from './host-account-spec';
import {Int} from './int';

export interface HostPosixAccountSpec extends HostAccountSpec {
  posixId?: Int;
  shellAccess?: boolean;
}
