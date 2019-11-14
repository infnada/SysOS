import {HostTargetTransport} from './host-target-transport';
import {Long} from './long';

export interface HostFibreChannelTargetTransport extends HostTargetTransport {
  nodeWorldWideName: Long;
  portWorldWideName: Long;
}
