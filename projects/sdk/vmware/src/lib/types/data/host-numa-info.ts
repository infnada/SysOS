import {DynamicData} from './dynamic-data';

import {HostNumaNode} from './host-numa-node';

export interface HostNumaInfo extends DynamicData {
  numaNode?: HostNumaNode[];
  numNodes: number;
  type: string;
}