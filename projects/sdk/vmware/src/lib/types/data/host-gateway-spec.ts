import {DynamicData} from './dynamic-data';

import {KeyValue} from './key-value';

export interface HostGatewaySpec extends DynamicData {
  gatewayId?: string;
  gatewayType: string;
  hostAuthParams?: KeyValue[];
  trustVerificationToken?: string;
}