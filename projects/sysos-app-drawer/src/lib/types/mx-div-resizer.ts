/**
 * Maintains the size of a div element in Internet Explorer. This is a
 * workaround for the right and bottom style being ignored in IE.
 *
 * If you need a div to cover the scrollwidth and -height of a document,
 * then you can use this class as follows:
 *
 * (code)
 * var resizer = new mxDivResizer(background);
 * resizer.getDocumentHeight = function()
 * {
 *   return document.body.scrollHeight;
 * }
 * resizer.getDocumentWidth = function()
 * {
 *   return document.body.scrollWidth;
 * }
 * resizer.resize();
 * (end)
 *
 * Constructor: mxDivResizer
 *
 * Constructs an object that maintains the size of a div
 * element when the window is being resized. This is only
 * required for Internet Explorer as it ignores the respective
 * stylesheet information for DIV elements.
 *
 * Parameters:
 *
 * div - Reference to the DOM node whose size should be maintained.
 * container - Optional Container that contains the div. Default is the
 * window.
 */
export interface mxDivResizer {
  (div: any, container: any): void;
  /**
   * Updates the style of the DIV after the window has been resized.
   */
  resize(): void;
  /**
   * Hook for subclassers to return the width of the document (without
   * scrollbars).
   */
  getDocumentWidth(): number;
  /**
   * Hook for subclassers to return the height of the document (without
   * scrollbars).
   */
  getDocumentHeight(): number;
}
