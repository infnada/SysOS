import {TopologyOption} from './topology-option';

export interface Topology {
  id: string;
  name: string;
  parentId: string;
  options: TopologyOption[];
  sub_topologies: Topology[];
  hide_if_empty: boolean;
  rank: string;
  stats: {
    node_count: number;
    edge_count: number;
    filtered_nodes: number;
    nonpseudo_node_count: number;
  }
}
