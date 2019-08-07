/**
 * A string to affect the display performance and rendering in IE, but not in SVG-based browsers. The parameter is mapped to <dialect>,
 * which may be one of <mxConstants.DIALECT_SVG> for SVG-based browsers,
 * <mxConstants.DIALECT_STRICTHTML> for fastest display mode,
 * <mxConstants.DIALECT_PREFERHTML> for faster display mode,
 * <mxConstants.DIALECT_MIXEDHTML> for fast
 * and <mxConstants.DIALECT_VML> for exact display mode (slowest). The dialects are defined in mxConstants.
 * The default values are DIALECT_SVG for SVG-based browsers and DIALECT_MIXED for IE.
 */
export enum renderingHint {
  /**
   * The display performance is
   * highly improved in IE if the VML is not contained within a VML group
   * element. The lack of a group element only slightly affects the display while
   * panning, but improves the performance by almost a factor of 2, while keeping
   * the display sufficiently accurate. This also allows to render certain shapes as HTML
   * if the display accuracy is not affected, which is implemented by
   * <mxShape.isMixedModeHtml>. This is the default setting and is mapped to
   * DIALECT_MIXEDHTML.
   */
  fast = 'fast',

  /**
   * Same as fast, but more expensive shapes are avoided. This is
   * controlled by <mxShape.preferModeHtml>. The default implementation will
   * avoid gradients and rounded rectangles, but more significant shapes, such
   * as rhombus, ellipse, actor and cylinder will be rendered accurately. This
   * setting is mapped to DIALECT_PREFERHTML.
   */
  faster = 'faster',

  /**
   * Almost anything will be rendered in Html.This allows for
   * rectangles, labels and images.This setting is mapped to
   * DIALECT_STRICTHTML.
   */
  fastest = 'fastest',

  /**
   * exact - If accurate panning is required and if the diagram is small(up
   * to 100 cells), then this value should be used.In this mode, a group is
   * created that contains the VML.This allows for accurate panning and is
   * mapped to DIALECT_VML.
   */
  exact = 'exact',
}
