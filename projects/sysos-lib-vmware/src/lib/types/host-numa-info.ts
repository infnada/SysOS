import {DynamicData} from './dynamic-data';

import {HostNumaNode} from './host-numa-node';
import {Int} from './int';
export interface HostNumaInfo extends DynamicData {
  numaNode?: HostNumaNode[];
  numNodes: Int;
  type: string;
}
