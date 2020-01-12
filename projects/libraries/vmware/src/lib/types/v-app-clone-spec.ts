import {DynamicData} from './dynamic-data';

import {VAppCloneSpecNetworkMappingPair} from './v-app-clone-spec-network-mapping-pair';
import {KeyValue} from './key-value';
import {VAppCloneSpecResourceMap} from './v-app-clone-spec-resource-map';
import {ResourceConfigSpec} from './resource-config-spec';
export interface VAppCloneSpec extends DynamicData {
  networkMapping?: VAppCloneSpecNetworkMappingPair[];
  property?: KeyValue[];
  provisioning?: string;
  resourceMapping?: VAppCloneSpecResourceMap[];
  resourceSpec?: ResourceConfigSpec;
}
