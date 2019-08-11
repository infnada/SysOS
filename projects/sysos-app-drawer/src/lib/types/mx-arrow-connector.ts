/**
 * Extends <mxShape> to implement an new rounded arrow shape with support for
 * waypoints and double arrows. (The shape is used to represent edges, not
 * vertices.) This shape is registered under <mxConstants.SHAPE_ARROW_CONNECTOR>
 * in <mxCellRenderer>.
 *
 * Constructor: mxArrowConnector
 *
 * Constructs a new arrow shape.
 *
 * Parameters:
 *
 * points - Array of <mxPoints> that define the points. This is stored in
 * <mxShape.points>.
 * fill - String that defines the fill color. This is stored in <fill>.
 * stroke - String that defines the stroke color. This is stored in <stroke>.
 * strokewidth - Optional integer that defines the stroke width. Default is
 * 1. This is stored in <strokewidth>.
 * arrowWidth - Optional integer that defines the arrow width. Default is
 * <mxConstants.ARROW_WIDTH>. This is stored in <arrowWidth>.
 * spacing - Optional integer that defines the spacing between the arrow shape
 * and its endpoints. Default is <mxConstants.ARROW_SPACING>. This is stored in
 * <spacing>.
 * endSize - Optional integer that defines the size of the arrowhead. Default
 * is <mxConstants.ARROW_SIZE>. This is stored in <endSize>.
 */
import {mxShape} from './mx-shape';

export interface mxArrowConnector extends mxShape {
  (points?: any, fill?: any, stroke?: any, strokewidth?: any, arrowWidth?: any, spacing?: any, endSize?: any): void;
  /**
   * Overrides mxShape to reset spacing.
   */
  resetStyles(): void;
  /**
   * Overrides apply to get smooth transition from default start- and endsize.
   */
  apply(state: any): void;
  /**
   * Augments the bounding box with the edge width and markers.
   */
  augmentBoundingBox(bbox: any): void;
  /**
   * Paints the line shape.
   */
  paintEdgeShape(c: any, pts: any): void;
  /**
   * Paints the line shape.
   */
  paintMarker(c: any, ptX: any, ptY: any, nx: any, ny: any, size: any, arrowWidth: any, edgeWidth: any, spacing: any, initialMove: any): void;
  /**
   * Returns wether the arrow is rounded
   */
  isArrowRounded(): any;
  /**
   * Returns the width of the start arrow
   */
  getStartArrowWidth(): number;
  /**
   * Returns the width of the end arrow
   */
  getEndArrowWidth(): number;
  /**
   * Returns the width of the body of the edge
   */
  getEdgeWidth(): number;
  /**
   * Returns whether the ends of the shape are drawn
   */
  isOpenEnded(): boolean;
  /**
   * Returns whether the start marker is drawn
   */
  isMarkerStart(): boolean;
  /**
   * Returns whether the end marker is drawn
   */
  isMarkerEnd(): boolean;
}
