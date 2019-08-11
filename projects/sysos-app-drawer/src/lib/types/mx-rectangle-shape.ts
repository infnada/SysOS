/**
 * Extends <mxShape> to implement a rectangle shape.
 * This shape is registered under <mxConstants.SHAPE_RECTANGLE>
 * in <mxCellRenderer>.
 */
import {mxShape} from './mx-shape';
import {mxRectangle} from './mx-rectangle';

export interface mxRectangleShape extends mxShape {
  /**
   * Constructs a new rectangle shape.
   *
   * @param bounds - <mxRectangle> that defines the bounds. This is stored in
   * <mxShape.bounds>.
   * @param fill - String that defines the fill color. This is stored in <fill>.
   * @param stroke - String that defines the stroke color. This is stored in <stroke>.
   * @param strokewidth - Optional integer that defines the stroke width. Default is
   * 1. This is stored in <strokewidth>.
   */
  (bounds?: mxRectangle, fill?: string, stroke?: string, strokewidth?: number): void;
  /**
   * Returns true for non-rounded, non-rotated shapes with no glass gradient.
   */
  isHtmlAllowed(): boolean;
  /**
   * Generic background painting implementation.
   */
  paintBackground(c: any, x: any, y: any, w: any, h: any): void;
  /**
   * Generic background painting implementation.
   */
  paintForeground(c: any, x: any, y: any, w: any, h: any): void;
}
