import {DynamicData} from './dynamic-data';

import {ClusterNetworkConfigSpec} from './cluster-network-config-spec';
import {SourceNodeSpec} from './source-node-spec';
import {PassiveNodeDeploymentSpec} from './passive-node-deployment-spec';
import {NodeDeploymentSpec} from './node-deployment-spec';
export interface VchaClusterDeploymentSpec extends DynamicData {
  activeVcNetworkConfig?: ClusterNetworkConfigSpec;
  activeVcSpec: SourceNodeSpec;
  passiveDeploymentSpec: PassiveNodeDeploymentSpec;
  witnessDeploymentSpec: NodeDeploymentSpec;
}
