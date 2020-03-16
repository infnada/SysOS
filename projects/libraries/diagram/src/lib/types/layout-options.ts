import {TopologyOption} from './topology-option';
import {LayoutEdge} from './layout-edge';
import {Layout} from './layout';
import {NodeCache} from './node-cache';

export interface LayoutOptions {
  forceRelayout: boolean;
  topologyId: string;
  topologyOptions: TopologyOption[];
  height: number;
  width: number;
  margins?: { left: number; top: number; };
  noCache?: boolean;
  cachedLayout?: Layout;
  edgeCache?: LayoutEdge[];
  nodeCache?: NodeCache[];
}
