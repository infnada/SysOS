import {DVSFeatureCapability} from './d-v-s-feature-capability';

import {VMwareDvsIpfixCapability} from './v-mware-dvs-ipfix-capability';
import {VMwareDvsLacpCapability} from './v-mware-dvs-lacp-capability';
import {VMwareDVSVspanCapability} from './v-mware-d-v-s-vspan-capability';

export interface VMwareDVSFeatureCapability extends DVSFeatureCapability {
  ipfixCapability?: VMwareDvsIpfixCapability;
  ipfixSupported?: boolean;
  lacpCapability?: VMwareDvsLacpCapability;
  lldpSupported?: boolean;
  multicastSnoopingSupported?: boolean;
  vspanCapability?: VMwareDVSVspanCapability;
  vspanSupported?: boolean;
}