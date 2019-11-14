import {DynamicData} from './dynamic-data';

import {KeyAnyValue} from './key-any-value';
import {Int} from './int';
export interface LinkLayerDiscoveryProtocolInfo extends DynamicData {
  chassisId: string;
  parameter?: KeyAnyValue[];
  portId: string;
  timeToLive: Int;
}
