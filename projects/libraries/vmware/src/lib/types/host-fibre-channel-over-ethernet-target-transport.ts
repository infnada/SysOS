import {HostFibreChannelTargetTransport} from './host-fibre-channel-target-transport';
import {Int} from './int';

export interface HostFibreChannelOverEthernetTargetTransport extends HostFibreChannelTargetTransport {
  fcfMac: string;
  vlanId: Int;
  vnportMac: string;
}
