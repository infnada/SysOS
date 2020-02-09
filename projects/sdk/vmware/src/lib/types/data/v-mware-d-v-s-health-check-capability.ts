import {DVSHealthCheckCapability} from './d-v-s-health-check-capability';


export interface VMwareDVSHealthCheckCapability extends DVSHealthCheckCapability {
  teamingSupported: boolean;
  vlanMtuSupported: boolean;
}