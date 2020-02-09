import {DynamicData} from './dynamic-data';

import {VAppEntityConfigInfo} from './v-app-entity-config-info';
import {OvfConsumerOstNode} from './ovf-consumer-ost-node';

export interface ImportSpec extends DynamicData {
  entityConfig?: VAppEntityConfigInfo;
  instantiationOst?: OvfConsumerOstNode;
}