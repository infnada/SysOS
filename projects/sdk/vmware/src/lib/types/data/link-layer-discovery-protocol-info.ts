import {DynamicData} from './dynamic-data';

import {KeyAnyValue} from './key-any-value';

export interface LinkLayerDiscoveryProtocolInfo extends DynamicData {
  chassisId: string;
  parameter?: KeyAnyValue[];
  portId: string;
  timeToLive: number;
}