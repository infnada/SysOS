import {DVSConfigSpec} from './d-v-s-config-spec';

import {VMwareIpfixConfig} from './v-mware-ipfix-config';
import {LinkDiscoveryProtocolConfig} from './link-discovery-protocol-config';
import {VMwareDVSPvlanConfigSpec} from './v-mware-d-v-s-pvlan-config-spec';
import {VMwareDVSVspanConfigSpec} from './v-mware-d-v-s-vspan-config-spec';

export interface VMwareDVSConfigSpec extends DVSConfigSpec {
  ipfixConfig?: VMwareIpfixConfig;
  lacpApiVersion?: string;
  linkDiscoveryProtocolConfig?: LinkDiscoveryProtocolConfig;
  maxMtu?: number;
  multicastFilteringMode?: string;
  pvlanConfigSpec?: VMwareDVSPvlanConfigSpec[];
  vspanConfigSpec?: VMwareDVSVspanConfigSpec[];
}