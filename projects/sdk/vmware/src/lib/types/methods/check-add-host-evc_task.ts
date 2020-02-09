import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostConnectSpec} from '../data/host-connect-spec';


export interface CheckAddHostEvc_Task {
  _this: ManagedObjectReference;
  cnxSpec: HostConnectSpec;
}