import {DynamicData} from './dynamic-data';

export interface HostInternetScsiHbaAuthenticationProperties extends DynamicData {
  chapAuthEnabled?: string;
  chapInherited?: boolean;
  chapName?: string;
  mutualChapInherited?: boolean;
  mutualChapName?: string;
  mutualChapSecret?: string;
}
