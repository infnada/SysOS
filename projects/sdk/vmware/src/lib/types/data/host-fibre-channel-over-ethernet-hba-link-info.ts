import {DynamicData} from './dynamic-data';


export interface HostFibreChannelOverEthernetHbaLinkInfo extends DynamicData {
  fcfMac: string;
  vlanId: number;
  vnportMac: string;
}