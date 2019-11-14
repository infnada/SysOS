import {HostPciPassthruConfig} from './host-pci-passthru-config';
import {Int} from './int';

export interface HostSriovConfig extends HostPciPassthruConfig {
  numVirtualFunction: Int;
  sriovEnabled: boolean;
}
