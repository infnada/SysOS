import {DynamicData} from './dynamic-data';


export interface HostInternetScsiHbaDigestCapabilities extends DynamicData {
  dataDigestSettable?: boolean;
  headerDigestSettable?: boolean;
  targetDataDigestSettable?: boolean;
  targetHeaderDigestSettable?: boolean;
}