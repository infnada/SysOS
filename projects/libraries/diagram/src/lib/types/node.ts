import {Metric} from './metric';

export interface Node {
  id: string,
  adjacency: string[];
  filtered: boolean;
  metrics: Metric[];
  metadata?: {
    id: string;
    value?: string;
    label: string;
    truncate?: boolean;
  }[];
  parents?: {
    id: string;
    label: string;
    topologyId: string;
  }[];
  label?: string;
  rank?: string;
  pseudo?: boolean;
}
