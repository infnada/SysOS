import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

import {ImGraphNodeMetric} from './im-graph-node-metric';
import {NodeGraphNodeMetadata} from './node-graph-node-metadata';

export interface ImGraphNode {
  id: string;
  nodeInfo: DataObject;
  label: string;
  labelMinor: string;
  rank: string;
  shape: string;
  stack: boolean;
  metadata: NodeGraphNodeMetadata[];
  metrics: ImGraphNodeMetric[];
  adjacency: string[];
}
