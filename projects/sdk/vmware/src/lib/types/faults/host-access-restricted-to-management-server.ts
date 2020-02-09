import {NotSupported} from './not-supported';


export interface HostAccessRestrictedToManagementServer extends NotSupported {
  managementServer: string;
}