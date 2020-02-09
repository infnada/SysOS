import {HostPciPassthruInfo} from './host-pci-passthru-info';


export interface HostSriovInfo extends HostPciPassthruInfo {
  maxVirtualFunctionSupported: number;
  numVirtualFunction: number;
  numVirtualFunctionRequested: number;
  sriovActive: boolean;
  sriovCapable: boolean;
  sriovEnabled: boolean;
}