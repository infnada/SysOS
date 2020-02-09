import {ManagedObjectReference} from '../data/managed-object-reference';
import {PassiveNodeDeploymentSpec} from '../data/passive-node-deployment-spec';
import {SourceNodeSpec} from '../data/source-node-spec';


export interface createPassiveNode_Task {
  _this: ManagedObjectReference;
  passiveDeploymentSpec: PassiveNodeDeploymentSpec;
  sourceVcSpec: SourceNodeSpec;
}