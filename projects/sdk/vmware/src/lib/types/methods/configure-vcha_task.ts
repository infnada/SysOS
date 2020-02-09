import {ManagedObjectReference} from '../data/managed-object-reference';
import {VchaClusterConfigSpec} from '../data/vcha-cluster-config-spec';


export interface configureVcha_Task {
  _this: ManagedObjectReference;
  configSpec: VchaClusterConfigSpec;
}