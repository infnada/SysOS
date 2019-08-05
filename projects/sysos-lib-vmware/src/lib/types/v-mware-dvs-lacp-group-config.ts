import {DynamicData} from './dynamic-data';

import {VMwareDvsLagIpfixConfig} from './v-mware-dvs-lag-ipfix-config';
import {VMwareDvsLagVlanConfig} from './v-mware-dvs-lag-vlan-config';
import {Int} from './int';
export interface VMwareDvsLacpGroupConfig extends DynamicData {
  ipfix?: VMwareDvsLagIpfixConfig;
  key?: string;
  loadbalanceAlgorithm?: string;
  mode?: string;
  name?: string;
  uplinkName?: string[];
  uplinkNum?: Int;
  uplinkPortKey?: string[];
  vlan?: VMwareDvsLagVlanConfig;
}
