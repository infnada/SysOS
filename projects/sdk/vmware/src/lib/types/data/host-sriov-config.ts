import {HostPciPassthruConfig} from './host-pci-passthru-config';


export interface HostSriovConfig extends HostPciPassthruConfig {
  numVirtualFunction: number;
  sriovEnabled: boolean;
}