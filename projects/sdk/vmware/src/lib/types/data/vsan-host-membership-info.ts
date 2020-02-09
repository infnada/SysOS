import {DynamicData} from './dynamic-data';


export interface VsanHostMembershipInfo extends DynamicData {
  hostname: string;
  nodeUuid: string;
}