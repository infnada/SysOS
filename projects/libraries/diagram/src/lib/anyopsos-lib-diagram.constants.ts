/**
 * NAMING
 */
export const EDGE_ID_SEPARATOR: string = '---';

// Named constants to avoid typos that would result in hard-to-detect bugs.
export const BLURRED_EDGES_LAYER = 'blurred-edges';
export const BLURRED_NODES_LAYER = 'blurred-nodes';
export const NORMAL_EDGES_LAYER = 'normal-edges';
export const NORMAL_NODES_LAYER = 'normal-nodes';
export const HIGHLIGHTED_EDGES_LAYER = 'highlighted-edges';
export const HIGHLIGHTED_NODES_LAYER = 'highlighted-nodes';
export const HOVERED_EDGES_LAYER = 'hovered-edges';
export const HOVERED_NODES_LAYER = 'hovered-nodes';

export const CONTENT_INCLUDED = 'content-included';
export const CONTENT_COVERING = 'content-covering';

/**
 * STYLES
 */
// NOTE: This value represents the node unit radius (in pixels). Since zooming is
// controlled at the top level now, this renormalization would be obsolete (i.e.
// value 1 could be used instead), if it wasn't for the following factors:
//   1. `dagre` library only works with integer coordinates,
//      so >> 1 value is used to increase layout precision.
//   2. Fonts don't behave nicely (especially on Firefox) if they
//      are given on a small unit scale as foreign objects in SVG.
export const NODE_BASE_SIZE: number = 100;

// This value represents the upper bound on the number of control points along the graph edge
// curve. Any integer value >= 6 should result in valid edges, but generally the greater this
// value is, the nicer the edge bundling will be. On the other hand, big values would result
// in slower rendering of the graph.
export const EDGE_WAYPOINTS_CAP: number = 10;

export const CANVAS_MARGINS = {
  top: 220, left: 80, right: 80, bottom: 150
};


/**
 * CUSTOM
 */
export const DEFAULT_MARGINS = { left: 0, top: 0 };
// Pretend the nodes are bigger than they are so that the edges would not enter
// them under a high curvature which would cause arrow heads to be misplaced.
export const NODE_SIZE_FACTOR: number = 1.5 * NODE_BASE_SIZE;
export const NODE_SEPARATION_FACTOR: number = 1 * NODE_BASE_SIZE;
export const RANK_SEPARATION_FACTOR: number = 2 * NODE_BASE_SIZE;
export const NODE_CENTERS_SEPARATION_FACTOR : number= NODE_SIZE_FACTOR + NODE_SEPARATION_FACTOR;

export const STORAGE_COMPONENTS: string[] = ['<persistent_volume>', '<storage_class>', '<persistent_volume_claim>', '<volume_snapshot>', '<volume_snapshot_data>'];
