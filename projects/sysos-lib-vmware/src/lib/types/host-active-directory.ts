import {DynamicData} from './dynamic-data';

import {HostActiveDirectorySpec} from './host-active-directory-spec';
export interface HostActiveDirectory extends DynamicData {
  changeOperation: string;
  spec?: HostActiveDirectorySpec;
}
