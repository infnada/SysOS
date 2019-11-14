export interface ImGraphNode {
  id: string;
  nodeInfo: string;
  label: string;
  labelMinor: string;
  rank: string;
  shape: string;
  stack: boolean;
  metadata: [];
  metrics: [];
  adjacency: string[];
}
