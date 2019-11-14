/**
 * Extends <mxShape> to implement a connector shape. The connector
 * shape allows for arrow heads on either side.
 *
 * This shape is registered under <mxConstants.SHAPE_CONNECTOR> in
 * <mxCellRenderer>.
 *
 * Constructor: mxConnector
 *
 * Constructs a new connector shape.
 *
 * Parameters:
 *
 * points - Array of <mxPoints> that define the points. This is stored in
 * <mxShape.points>.
 * stroke - String that defines the stroke color. This is stored in <stroke>.
 * Default is 'black'.
 * strokewidth - Optional integer that defines the stroke width. Default is
 * 1. This is stored in <strokewidth>.
 */
import {mxPolyline} from './mx-polyline';

export interface mxConnector extends mxPolyline {
  (points: any, stroke: any, strokewidth: any): void;
  /**
   * Updates the <boundingBox> for this shape using <createBoundingBox> and
   * <augmentBoundingBox> and stores the result in <boundingBox>.
   */
  updateBoundingBox(): void;
  /**
   * Paints the line shape.
   */
  paintEdgeShape(c: any, pts: any): void;
  /**
   * Prepares the marker by adding offsets in pts and returning a function to
   * paint the marker.
   */
  createMarker(c: any, pts: any, source: any): any;
  /**
   * Augments the bounding box with the strokewidth and shadow offsets.
   */
  augmentBoundingBox(bbox: any): void;
}
