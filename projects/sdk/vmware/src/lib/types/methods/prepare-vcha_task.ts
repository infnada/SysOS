import {ManagedObjectReference} from '../data/managed-object-reference';
import {VchaClusterNetworkSpec} from '../data/vcha-cluster-network-spec';


export interface prepareVcha_Task {
  _this: ManagedObjectReference;
  networkSpec: VchaClusterNetworkSpec;
}