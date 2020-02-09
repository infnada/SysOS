import {ManagedObjectReference} from '../data/managed-object-reference';
import {VchaClusterDeploymentSpec} from '../data/vcha-cluster-deployment-spec';


export interface deployVcha_Task {
  _this: ManagedObjectReference;
  deploymentSpec: VchaClusterDeploymentSpec;
}