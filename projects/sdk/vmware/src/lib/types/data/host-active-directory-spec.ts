import {DynamicData} from './dynamic-data';


export interface HostActiveDirectorySpec extends DynamicData {
  camServer?: string;
  domainName?: string;
  password?: string;
  smartCardAuthenticationEnabled?: boolean;
  smartCardTrustAnchors?: string[];
  thumbprint?: string;
  userName?: string;
}