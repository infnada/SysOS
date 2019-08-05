import {HostPciPassthruInfo} from './host-pci-passthru-info';
import {Int} from './int';

export interface HostSriovInfo extends HostPciPassthruInfo {
  maxVirtualFunctionSupported: Int;
  numVirtualFunction: Int;
  numVirtualFunctionRequested: Int;
  sriovActive: boolean;
  sriovCapable: boolean;
  sriovEnabled: boolean;
}
