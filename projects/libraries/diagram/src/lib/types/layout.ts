import {LayoutNode} from './layout-node';
import {LayoutEdge} from './layout-edge';

export interface Layout {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  graphHeight?: number;
  graphWidth?: number;
  height?: number;
  width?: number;
}
