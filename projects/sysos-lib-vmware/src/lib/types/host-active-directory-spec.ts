export interface HostActiveDirectorySpec {
  camServer?: string;
  domainName?: string;
  password?: string;
  smartCardAuthenticationEnabled?: boolean;
  smartCardTrustAnchors?: string[];
  thumbprint?: string;
  userName?: string;
}
