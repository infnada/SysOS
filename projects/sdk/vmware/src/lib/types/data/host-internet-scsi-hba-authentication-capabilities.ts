import {DynamicData} from './dynamic-data';


export interface HostInternetScsiHbaAuthenticationCapabilities extends DynamicData {
  chapAuthSettable: boolean;
  krb5AuthSettable: boolean;
  mutualChapSettable?: boolean;
  spkmAuthSettable: boolean;
  srpAuthSettable: boolean;
  targetChapSettable?: boolean;
  targetMutualChapSettable?: boolean;
}