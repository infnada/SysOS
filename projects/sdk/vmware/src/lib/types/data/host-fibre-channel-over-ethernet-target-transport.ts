import {HostFibreChannelTargetTransport} from './host-fibre-channel-target-transport';


export interface HostFibreChannelOverEthernetTargetTransport extends HostFibreChannelTargetTransport {
  fcfMac: string;
  vlanId: number;
  vnportMac: string;
}