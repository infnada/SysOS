import {EVCConfigFault} from './e-v-c-config-fault';

export interface EVCModeIllegalByVendor extends EVCConfigFault {
  clusterCPUVendor: string;
  modeCPUVendor: string;
}
