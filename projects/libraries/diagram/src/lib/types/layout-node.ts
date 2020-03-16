import {Network} from './network';
import {Metric} from './metric';
import {NodeMatch} from './node-match';

export interface LayoutNode {
  id: string;
  x: number;
  y: number;

  // Node matches based on searchQuery
  matches: NodeMatch[];

  networks: Network[];

  // Node metrics
  metrics?: Metric[];

  // Selected driagram metric of this node
  metric?: Metric;

  // If is the current selected node or is neighbor of it
  focused?: boolean;

  // When notMatched || notFocused || notInNetwork
  blurred?: boolean;

  // If is the current selected node or is highlighted
  highlighted?: boolean;

  // Node shape
  shape: 'circle' | 'cloud' | 'cylinder' | 'dottedcylinde' | 'ShapeDottedTriangle' | 'heptagon' | 'hexagon' | 'octago' | 'pentagon' | 'sheet' | 'square' | 'triangle';
  tag: string;

  // Shape is stacked
  stack: boolean;

  // name
  label: string;

  // description
  labelMinor: string;
  pseudo: boolean;
  rank: string;
  scale: number;
  degree: number;
  type: 'hovered-nodes' | 'blurred-nodes' | 'normal-nodes' | 'highlighted-nodes';
}
