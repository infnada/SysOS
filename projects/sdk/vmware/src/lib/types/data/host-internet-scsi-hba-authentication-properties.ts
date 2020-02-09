import {DynamicData} from './dynamic-data';


export interface HostInternetScsiHbaAuthenticationProperties extends DynamicData {
  chapAuthEnabled: boolean;
  chapAuthenticationType?: string;
  chapInherited?: boolean;
  chapName?: string;
  chapSecret?: string;
  mutualChapAuthenticationType?: string;
  mutualChapInherited?: boolean;
  mutualChapName?: string;
  mutualChapSecret?: string;
}