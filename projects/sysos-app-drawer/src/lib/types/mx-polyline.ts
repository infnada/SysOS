/**
 * Extends <mxShape> to implement a polyline (a line with multiple points).
 * This shape is registered under <mxConstants.SHAPE_POLYLINE> in
 * <mxCellRenderer>.
 *
 * Constructor: mxPolyline
 *
 * Constructs a new polyline shape.
 *
 * Parameters:
 *
 * points - Array of <mxPoints> that define the points. This is stored in
 * <mxShape.points>.
 * stroke - String that defines the stroke color. Default is 'black'. This is
 * stored in <stroke>.
 * strokewidth - Optional integer that defines the stroke width. Default is
 * 1. This is stored in <strokewidth>.
 */
import {mxShape} from './mx-shape';
import {mxPoint} from './mx-point';

export interface mxPolyline extends mxShape {
  (points?: mxPoint[], stroke?: string, strokewidth?: number): void;
  /**
   * Returns 0.
   */
  getRotation(): number;
  /**
   * Returns 0.
   */
  getShapeRotation(): number;
  /**
   * Returns false.
   */
  isPaintBoundsInverted(): boolean;
  /**
   * Paints the line shape.
   */
  paintEdgeShape(c: any, pts: any): void;
  /**
   * Paints the line shape.
   */
  paintLine(c: any, pts: any, rounded: any): void;
  /**
   * Paints the line shape.
   */
  paintCurvedLine(c: any, pts: any): void;
}
