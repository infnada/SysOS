import {HostHostBusAdapter} from './host-host-bus-adapter';

import {FibreChannelPortType} from './fibre-channel-port-type';
import {Long} from './long';
export interface HostFibreChannelHba extends HostHostBusAdapter {
  nodeWorldWideName: Long;
  portType: FibreChannelPortType;
  portWorldWideName: Long;
  speed: Long;
}
