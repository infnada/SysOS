import {DynamicData} from './dynamic-data';
import {Int} from './int';

export interface HostFibreChannelOverEthernetHbaLinkInfo extends DynamicData {
  fcfMac: string;
  vlanId: Int;
  vnportMac: string;
}
