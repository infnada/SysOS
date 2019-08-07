/**
 * Implements printing of a diagram across multiple pages. The following opens
 * a print preview for an existing graph:
 *
 * (code)
 * var preview = new mxPrintPreview(graph);
 * preview.open();
 * (end)
 *
 * Use <mxUtils.getScaleForPageCount> as follows in order to print the graph
 * across a given number of pages:
 *
 * (code)
 * var pageCount = mxUtils.prompt('Enter page count', '1');
 *
 * if (pageCount != null)
 * {
 *   var scale = mxUtils.getScaleForPageCount(pageCount, graph);
 *   var preview = new mxPrintPreview(graph, scale);
 *   preview.open();
 * }
 * (end)
 *
 * Additional pages:
 *
 * To add additional pages before and after the output, <getCoverPages> and
 * <getAppendices> can be used, respectively.
 *
 * (code)
 * var preview = new mxPrintPreview(graph, 1);
 *
 * preview.getCoverPages = function(w, h)
 * {
 *   return [this.renderPage(w, h, 0, 0, mxUtils.bind(this, function(div)
 *   {
 *     div.innerHTML = '<div style="position:relative;margin:4px;">Cover Page</p>'
 *   }))];
 * };
 *
 * preview.getAppendices = function(w, h)
 * {
 *   return [this.renderPage(w, h, 0, 0, mxUtils.bind(this, function(div)
 *   {
 *     div.innerHTML = '<div style="position:relative;margin:4px;">Appendix</p>'
 *   }))];
 * };
 *
 * preview.open();
 * (end)
 *
 * CSS:
 *
 * The CSS from the original page is not carried over to the print preview.
 * To add CSS to the page, use the css argument in the <open> function or
 * override <writeHead> to add the respective link tags as follows:
 *
 * (code)
 * var writeHead = preview.writeHead;
 * preview.writeHead = function(doc, css)
 * {
 *   writeHead.apply(this, arguments);
 *   doc.writeln('<link rel="stylesheet" type="text/css" href="style.css">');
 * };
 * (end)
 *
 * Padding:
 *
 * To add a padding to the page in the preview (but not the print output), use
 * the following code:
 *
 * (code)
 * preview.writeHead = function(doc)
 * {
 *   writeHead.apply(this, arguments);
 *
 *   doc.writeln('<style type="text/css">');
 *   doc.writeln('@media screen {');
 *   doc.writeln('  body > div { padding-top:30px;padding-left:40px;box-sizing:content-box; }');
 *   doc.writeln('}');
 *   doc.writeln('</style>');
 * };
 * (end)
 *
 * Headers:
 *
 * Apart from setting the title argument in the mxPrintPreview constructor you
 * can override <renderPage> as follows to add a header to any page:
 *
 * (code)
 * var oldRenderPage = mxPrintPreview.prototype.renderPage;
 * mxPrintPreview.prototype.renderPage = function(w, h, x, y, content, pageNumber)
 * {
 *   var div = oldRenderPage.apply(this, arguments);
 *
 *   var header = document.createElement('div');
 *   header.style.position = 'absolute';
 *   header.style.top = '0px';
 *   header.style.width = '100%';
 *   header.style.textAlign = 'right';
 *   mxUtils.write(header, 'Your header here');
 *   div.firstChild.appendChild(header);
 *
 *   return div;
 * };
 * (end)
 *
 * The pageNumber argument contains the number of the current page, starting at
 * 1. To display a header on the first page only, check pageNumber and add a
 * vertical offset in the constructor call for the height of the header.
 *
 * Page Format:
 *
 * For landscape printing, use <mxConstants.PAGE_FORMAT_A4_LANDSCAPE> as
 * the pageFormat in <mxUtils.getScaleForPageCount> and <mxPrintPreview>.
 * Keep in mind that one can not set the defaults for the print dialog
 * of the operating system from JavaScript so the user must manually choose
 * a page format that matches this setting.
 *
 * You can try passing the following CSS directive to <open> to set the
 * page format in the print dialog to landscape. However, this CSS
 * directive seems to be ignored in most major browsers, including IE.
 *
 * (code)
 * @page {
 *   size: landscape;
 * }
 * (end)
 *
 * Note that the print preview behaves differently in IE when used from the
 * filesystem or via HTTP so printing should always be tested via HTTP.
 *
 * If you are using a DOCTYPE in the source page you can override <getDoctype>
 * and provide the same DOCTYPE for the print preview if required. Here is
 * an example for IE8 standards mode.
 *
 * (code)
 * var preview = new mxPrintPreview(graph);
 * preview.getDoctype = function()
 * {
 *   return '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=8" ><![endif]-->';
 * };
 * preview.open();
 * (end)
 *
 * Constructor: mxPrintPreview
 *
 * Constructs a new print preview for the given parameters.
 *
 * Parameters:
 *
 * graph - <mxGraph> to be previewed.
 * scale - Optional scale of the output. Default is 1 / <mxGraph.pageScale>.
 * border - Border in pixels along each side of every page. Note that the
 * actual print function in the browser will add another border for
 * printing.
 * pageFormat - <mxRectangle> that specifies the page format (in pixels).
 * This should match the page format of the printer. Default uses the
 * <mxGraph.pageFormat> of the given graph.
 * x0 - Optional left offset of the output. Default is 0.
 * y0 - Optional top offset of the output. Default is 0.
 * borderColor - Optional color of the page border. Default is no border.
 * Note that a border is sometimes useful to highlight the printed page
 * border in the print preview of the browser.
 * title - Optional string that is used for the window title. Default
 * is 'Printer-friendly version'.
 * pageSelector - Optional boolean that specifies if the page selector
 * should appear in the window with the print preview. Default is true.
 */
export interface mxPrintPreview {
  constructor(graph: any, scale: any, pageFormat: any, border: any, x0: any, y0: any, borderColor: any, title: any, pageSelector: any);
  /**
   * Returns <wnd>.
   */
  getWindow(): any;
  /**
   * Returns the string that should go before the HTML tag in the print preview
   * page. This implementation returns an X-UA meta tag for IE5 in quirks mode,
   * IE8 in IE8 standards mode and edge in IE9 standards mode.
   */
  getDoctype(): string;
  /**
   * Adds the given graph to the existing print preview.
   *
   * Parameters:
   *
   * css - Optional CSS string to be used in the head section.
   * targetWindow - Optional window that should be used for rendering. If
   * this is specified then no HEAD tag, CSS and BODY tag will be written.
   */
  appendGraph(graph: any, scale: any, x0: any, y0: any, forcePageBreaks: any, keepOpen: any): void;
  /**
   * Shows the print preview window. The window is created here if it does
   * not exist.
   *
   * Parameters:
   *
   * css - Optional CSS string to be used in the head section.
   * targetWindow - Optional window that should be used for rendering. If
   * this is specified then no HEAD tag, CSS and BODY tag will be written.
   */
  open(css: any, targetWindow: any, forcePageBreaks: any, keepOpen: any): any;
  /**
   * Adds a page break to the given document.
   */
  addPageBreak(doc: any): void;
  /**
   * Writes the closing tags for body and page after calling <writePostfix>.
   */
  closeDocument(): void;
  /**
   * Writes the HEAD section into the given document, without the opening
   * and closing HEAD tags.
   */
  writeHead(doc: any, css: any): void;
  /**
   * Called before closing the body of the page. This implementation is empty.
   */
  writePostfix(doc: any): void;
  /**
   * Creates the page selector table.
   */
  createPageSelector(vpages: any, hpages: any): any;
  /**
   * Creates a DIV that prints a single page of the given
   * graph using the given scale and returns the DIV that
   * represents the page.
   *
   * Parameters:
   *
   * w - Width of the page in pixels.
   * h - Height of the page in pixels.
   * dx - Optional horizontal page offset in pixels (used internally).
   * dy - Optional vertical page offset in pixels (used internally).
   * content - Callback that adds the HTML content to the inner div of a page.
   * Takes the inner div as the argument.
   * pageNumber - Integer representing the page number.
   */
  renderPage(w: any, h: any, dx: any, dy: any, content: any, pageNumber: any): HTMLDivElement;
  /**
   * Returns the root cell for painting the graph.
   */
  getRoot(): any;
  /**
   * Adds a graph fragment to the given div.
   *
   * Parameters:
   *
   * dx - Horizontal translation for the diagram.
   * dy - Vertical translation for the diagram.
   * scale - Scale for the diagram.
   * pageNumber - Number of the page to be rendered.
   * div - Div that contains the output.
   * clip - Contains the clipping rectangle as an <mxRectangle>.
   */
  addGraphFragment(dx: any, dy: any, scale: any, pageNumber: any, div: any, clip: any): void;
  /**
   * Returns the link for the given cell state. This returns null.
   */
  getLinkForCellState(state: any): any;
  /**
   * Inserts the background image into the given div.
   */
  insertBackgroundImage(div: any, dx: any, dy: any): void;
  /**
   * Returns the pages to be added before the print output. This returns null.
   */
  getCoverPages(): any;
  /**
   * Returns the pages to be added after the print output. This returns null.
   */
  getAppendices(): any;
  /**
   * Opens the print preview and shows the print dialog.
   *
   * Parameters:
   *
   * css - Optional CSS string to be used in the head section.
   */
  print(css: any): void;
  /**
   * Closes the print preview window.
   */
  close(): void;
}
