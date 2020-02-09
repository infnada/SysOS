import {ManagedObjectReference} from '../data/managed-object-reference';
import {NodeDeploymentSpec} from '../data/node-deployment-spec';
import {SourceNodeSpec} from '../data/source-node-spec';


export interface createWitnessNode_Task {
  _this: ManagedObjectReference;
  witnessDeploymentSpec: NodeDeploymentSpec;
  sourceVcSpec: SourceNodeSpec;
}