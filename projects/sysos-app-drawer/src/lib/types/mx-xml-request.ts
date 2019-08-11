/**
 * XML HTTP request wrapper. See also: <mxUtils.get>, <mxUtils.post> and
 * <mxUtils.load>. This class provides a cross-browser abstraction for Ajax
 * requests.
 *
 * Encoding:
 *
 * For encoding parameter values, the built-in encodeURIComponent JavaScript
 * method must be used. For automatic encoding of post data in <mxEditor> the
 * <mxEditor.escapePostData> switch can be set to true (default). The encoding
 * will be carried out using the conte type of the page. That is, the page
 * containting the editor should contain a meta tag in the header, eg.
 * <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
 *
 * Example:
 *
 * (code)
 * var onload = function(req)
 * {
 *   mxUtils.alert(req.getDocumentElement());
 * }
 *
 * var onerror = function(req)
 * {
 *   mxUtils.alert('Error');
 * }
 * new mxXmlRequest(url, 'key=value').send(onload, onerror);
 * (end)
 *
 * Sends an asynchronous POST request to the specified URL.
 *
 * Example:
 *
 * (code)
 * var req = new mxXmlRequest(url, 'key=value', 'POST', false);
 * req.send();
 * mxUtils.alert(req.getDocumentElement());
 * (end)
 *
 * Sends a synchronous POST request to the specified URL.
 *
 * Example:
 *
 * (code)
 * var encoder = new mxCodec();
 * var result = encoder.encode(graph.getModel());
 * var xml = encodeURIComponent(mxUtils.getXml(result));
 * new mxXmlRequest(url, 'xml='+xml).send();
 * (end)
 *
 * Sends an encoded graph model to the specified URL using xml as the
 * parameter name. The parameter can then be retrieved in C# as follows:
 *
 * (code)
 * string xml = HttpUtility.UrlDecode(context.Request.Params['xml']);
 * (end)
 *
 * Or in Java as follows:
 *
 * (code)
 * String xml = URLDecoder.decode(request.getParameter('xml'), 'UTF-8').replace('\n', '&#xa;');
 * (end)
 *
 * Note that the linefeeds should only be replaced if the XML is
 * processed in Java, for example when creating an image.
 *
 * Constructor: mxXmlRequest
 *
 * Constructs an XML HTTP request.
 *
 * Parameters:
 *
 * url - Target URL of the request.
 * params - Form encoded parameters to send with a POST request.
 * method - String that specifies the request method. Possible values are
 * POST and GET. Default is POST.
 * async - Boolean specifying if an asynchronous request should be used.
 * Default is true.
 * username - String specifying the username to be used for the request.
 * password - String specifying the password to be used for the request.
 */
export interface mxXmlRequest {
  (url: any, params: any, method: any, async: any, username: any, password: any): void;
  /**
   * Returns <binary>.
   */
  isBinary(): any;
  /**
   * Sets <binary>.
   */
  setBinary(value: any): void;
  /**
   * Returns true if the response is ready.
   */
  isReady(): boolean;
  /**
   * Returns the document element of the response XML document.
   */
  getDocumentElement(): any;
  /**
   * Returns the response as an XML document. Use <getDocumentElement> to get
   * the document element of the XML document.
   */
  getXml(): any;
  /**
   * Returns the response as a string.
   */
  getText(): any;
  /**
   * Returns the status as a number, eg. 404 for 'Not found' or 200 for 'OK'.
   * Note: The NS_ERROR_NOT_AVAILABLE for invalid responses cannot be cought.
   */
  getStatus(): any;
  /**
   * Send the <request> to the target URL using the specified functions to
   * process the response asychronously.
   *
   * Parameters:
   *
   * onload - Function to be invoked if a successful response was received.
   * onerror - Function to be called on any error.
   * timeout - Optional timeout in ms before calling ontimeout.
   * ontimeout - Optional function to execute on timeout.
   */
  send(onload: any, onerror: any, timeout: any, ontimeout: any): void;
  /**
   * Sets the headers for the given request and parameters. This sets the
   * content-type to application/x-www-form-urlencoded if any params exist.
   *
   * Example:
   *
   * (code)
   * request.setRequestHeaders = function(request, params)
   * {
   *   if (params != null)
   *   {
   *     request.setRequestHeader('Content-Type',
   *             'multipart/form-data');
   *     request.setRequestHeader('Content-Length',
   *             params.length);
   *   }
   * };
   * (end)
   *
   * Use the code above before calling <send> if you require a
   * multipart/form-data request.
   */
  setRequestHeaders(request: any, params: any): void;
  /**
   * Creates and posts a request to the given target URL using a dynamically
   * created form inside the given document.
   *
   * Parameters:
   *
   * docs - Document that contains the form element.
   * target - Target to send the form result to.
   */
  simulate(doc: any, target: any): void;
}
