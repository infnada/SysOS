import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostPciPassthruConfig} from '../data/host-pci-passthru-config';


export interface UpdatePassthruConfig {
  _this: ManagedObjectReference;
  config: HostPciPassthruConfig[];
}