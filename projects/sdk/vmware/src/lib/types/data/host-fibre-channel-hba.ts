import {HostHostBusAdapter} from './host-host-bus-adapter';

import {FibreChannelPortType} from '../enums/fibre-channel-port-type';

export interface HostFibreChannelHba extends HostHostBusAdapter {
  nodeWorldWideName: number;
  portType: FibreChannelPortType;
  portWorldWideName: number;
  speed: number;
}