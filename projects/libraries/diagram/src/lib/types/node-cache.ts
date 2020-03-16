import {LayoutNode} from './layout-node';

export interface NodeCache {
  id: LayoutNode['id'];
  x: LayoutNode['x'];
  y: LayoutNode['y'];
  rank: LayoutNode['rank'];
}
