import {DynamicData} from './dynamic-data';


export interface HostInternetScsiHbaDigestProperties extends DynamicData {
  dataDigestInherited?: boolean;
  dataDigestType?: string;
  headerDigestInherited?: boolean;
  headerDigestType?: string;
}