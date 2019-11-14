import {DynamicData} from './dynamic-data';

export interface HostInternetScsiHbaAuthenticationCapabilities extends DynamicData {
  chapAuthSettable: boolean;
  mutualChapSettable?: boolean;
  spkmAuthSettable: boolean;
  srpAuthSettable: boolean;
  targetChapSettable?: boolean;
  targetMutualChapSettable?: boolean;
}
