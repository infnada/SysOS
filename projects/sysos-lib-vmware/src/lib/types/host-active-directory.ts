import {HostActiveDirectorySpec} from "./host-active-directory-spec";

export interface HostActiveDirectory {
  changeOperation: string;
  spec?: HostActiveDirectorySpec;
}
