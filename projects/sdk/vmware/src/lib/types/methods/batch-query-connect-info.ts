import {ManagedObjectReference} from '../data/managed-object-reference';
import {HostConnectSpec} from '../data/host-connect-spec';


export interface BatchQueryConnectInfo {
  _this: ManagedObjectReference;
  hostSpecs?: HostConnectSpec[];
}