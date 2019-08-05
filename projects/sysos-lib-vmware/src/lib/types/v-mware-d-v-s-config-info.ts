import {DVSConfigInfo} from './d-v-s-config-info';

import {VMwareIpfixConfig} from './v-mware-ipfix-config';
import {VMwareDvsLacpGroupConfig} from './v-mware-dvs-lacp-group-config';
import {LinkDiscoveryProtocolConfig} from './link-discovery-protocol-config';
import {VMwareDVSPvlanMapEntry} from './v-mware-d-v-s-pvlan-map-entry';
import {VMwareVspanSession} from './v-mware-vspan-session';
import {Int} from './int';
export interface VMwareDVSConfigInfo extends DVSConfigInfo {
  ipfixConfig?: VMwareIpfixConfig;
  lacpApiVersion?: string;
  lacpGroupConfig?: VMwareDvsLacpGroupConfig[];
  linkDiscoveryProtocolConfig?: LinkDiscoveryProtocolConfig;
  maxMtu: Int;
  multicastFilteringMode?: string;
  pvlanConfig?: VMwareDVSPvlanMapEntry[];
  vspanSession?: VMwareVspanSession[];
}
