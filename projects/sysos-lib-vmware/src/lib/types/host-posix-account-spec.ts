import {HostAccountSpec} from "./host-account-spec";

export interface HostPosixAccountSpec extends HostAccountSpec {
  posixId?: number;
  shellAccess?: boolean;
}
