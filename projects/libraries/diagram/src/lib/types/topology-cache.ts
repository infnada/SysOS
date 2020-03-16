import {graphlib} from 'dagre';

import {Layout} from './layout';
import {LayoutEdge} from './layout-edge';
import {NodeCache} from './node-cache';

export interface TopologyCache {
  cacheId: string;
  graph: graphlib.Graph;
  cachedLayout?: Layout;
  edgeCache: LayoutEdge[];
  nodeCache: NodeCache[]
}
