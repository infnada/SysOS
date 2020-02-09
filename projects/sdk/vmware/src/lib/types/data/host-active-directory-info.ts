import {HostDirectoryStoreInfo} from './host-directory-store-info';


export interface HostActiveDirectoryInfo extends HostDirectoryStoreInfo {
  domainMembershipStatus?: string;
  joinedDomain?: string;
  smartCardAuthenticationEnabled?: boolean;
  trustedDomain?: string[];
}