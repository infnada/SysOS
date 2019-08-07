/**
 * Creates a new image export instance to be used with an export canvas. Here
 * is an example that uses this class to create an image via a backend using
 * <mxXmlExportCanvas>.
 *
 * (code)
 * var xmlDoc = mxUtils.createXmlDocument();
 * var root = xmlDoc.createElement('output');
 * xmlDoc.appendChild(root);
 *
 * var xmlCanvas = new mxXmlCanvas2D(root);
 * var imgExport = new mxImageExport();
 * imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);
 *
 * var bounds = graph.getGraphBounds();
 * var w = Math.ceil(bounds.x + bounds.width);
 * var h = Math.ceil(bounds.y + bounds.height);
 *
 * var xml = mxUtils.getXml(root);
 * new mxXmlRequest('export', 'format=png&w=' + w +
 * 		'&h=' + h + '&bg=#F9F7ED&xml=' + encodeURIComponent(xml))
 * 		.simulate(document, '_blank');
 * (end)
 *
 * Constructor: mxImageExport
 *
 * Constructs a new image export.
 */
export interface mxImageExport {
  /**
   * Draws the given state and all its descendants to the given canvas.
   */
  drawState(state: any, canvas: any): void;
  /**
   * Draws the given state and all its descendants to the given canvas.
   */
  visitStatesRecursive(state: any, canvas: any, visitor: any): void;
  /**
   * Returns the link for the given cell state and canvas. This returns null.
   */
  getLinkForCellState(state: any, canvas: any): any;
  /**
   * Draws the given state to the given canvas.
   */
  drawCellState(state: any, canvas: any): void;
  /**
   * Draws the shape of the given state.
   */
  drawShape(state: any, canvas: any): void;
  /**
   * Draws the text of the given state.
   */
  drawText(state: any, canvas: any): void;
  /**
   * Draws the overlays for the given state. This is called if <includeOverlays>
   * is true.
   */
  drawOverlays(state: any, canvas: any): void;
}
