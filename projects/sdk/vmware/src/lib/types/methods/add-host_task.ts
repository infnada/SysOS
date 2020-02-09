import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostConnectSpec} from '../data/host-connect-spec';


export interface AddHost_Task {
  _this: ManagedObjectReference;
  spec: HostConnectSpec;
  asConnected: boolean;
  resourcePool?: ManagedObjectReference & { $type: 'ResourcePool'; };
  license?: string;
}