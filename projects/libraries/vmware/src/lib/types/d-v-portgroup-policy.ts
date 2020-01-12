import {DynamicData} from './dynamic-data';

export interface DVPortgroupPolicy extends DynamicData {
  blockOverrideAllowed: boolean;
  livePortMovingAllowed: boolean;
  networkResourcePoolOverrideAllowed?: boolean;
  portConfigResetAtDisconnect: boolean;
  shapingOverrideAllowed: boolean;
  trafficFilterOverrideAllowed?: boolean;
  vendorConfigOverrideAllowed: boolean;
}
