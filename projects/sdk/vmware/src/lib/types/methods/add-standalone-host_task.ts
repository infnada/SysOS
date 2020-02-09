import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostConnectSpec} from '../data/host-connect-spec';
import {ComputeResourceConfigSpec} from '../data/compute-resource-config-spec';


export interface AddStandaloneHost_Task {
  _this: ManagedObjectReference;
  spec: HostConnectSpec;
  compResSpec?: ComputeResourceConfigSpec;
  addConnected: boolean;
  license?: string;
}