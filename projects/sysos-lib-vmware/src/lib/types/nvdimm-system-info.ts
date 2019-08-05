import {DynamicData} from './dynamic-data';

import {NvdimmDimmInfo} from './nvdimm-dimm-info';
import {NvdimmInterleaveSetInfo} from './nvdimm-interleave-set-info';
import {NvdimmGuid} from './nvdimm-guid';
import {NvdimmNamespaceInfo} from './nvdimm-namespace-info';
import {NvdimmSummary} from './nvdimm-summary';
import {Int} from './int';
export interface NvdimmSystemInfo extends DynamicData {
  dimmInfo?: NvdimmDimmInfo[];
  dimms?: Int[];
  interleaveSet?: Int[];
  iSetInfo?: NvdimmInterleaveSetInfo[];
  namespace?: NvdimmGuid[];
  nsInfo?: NvdimmNamespaceInfo[];
  summary?: NvdimmSummary;
}
