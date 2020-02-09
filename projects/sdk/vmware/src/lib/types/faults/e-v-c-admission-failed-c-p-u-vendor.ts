import {EVCAdmissionFailed} from './e-v-c-admission-failed';


export interface EVCAdmissionFailedCPUVendor extends EVCAdmissionFailed {
  clusterCPUVendor: string;
  hostCPUVendor: string;
}