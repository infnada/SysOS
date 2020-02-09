import {HostTargetTransport} from './host-target-transport';


export interface HostFibreChannelTargetTransport extends HostTargetTransport {
  nodeWorldWideName: number;
  portWorldWideName: number;
}