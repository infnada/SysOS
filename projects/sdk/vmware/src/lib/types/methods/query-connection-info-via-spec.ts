import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostConnectSpec} from '../data/host-connect-spec';


export interface QueryConnectionInfoViaSpec {
  _this: ManagedObjectReference;
  spec: HostConnectSpec;
}