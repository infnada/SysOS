import {DynamicData} from './dynamic-data';

import {NvdimmDimmInfo} from './nvdimm-dimm-info';
import {NvdimmInterleaveSetInfo} from './nvdimm-interleave-set-info';
import {NvdimmGuid} from './nvdimm-guid';
import {NvdimmNamespaceDetails} from './nvdimm-namespace-details';
import {NvdimmNamespaceInfo} from './nvdimm-namespace-info';
import {NvdimmSummary} from './nvdimm-summary';

export interface NvdimmSystemInfo extends DynamicData {
  dimmInfo?: NvdimmDimmInfo[];
  dimms?: number[];
  interleaveSet?: number[];
  iSetInfo?: NvdimmInterleaveSetInfo[];
  namespace?: NvdimmGuid[];
  nsDetails?: NvdimmNamespaceDetails[];
  nsInfo?: NvdimmNamespaceInfo[];
  summary?: NvdimmSummary;
}