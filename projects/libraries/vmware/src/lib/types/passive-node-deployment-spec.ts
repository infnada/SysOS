import {NodeDeploymentSpec} from './node-deployment-spec';

import {CustomizationIPSettings} from './customization-i-p-settings';
export interface PassiveNodeDeploymentSpec extends NodeDeploymentSpec {
  failoverIpSettings?: CustomizationIPSettings;
}
