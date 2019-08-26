import {Component, OnInit} from '@angular/core';

import {SysosLibMxgraphService} from "@sysos/lib-mxgraph";

@Component({
  selector: 'sadrw-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  private mx;

  constructor(private MxgraphService: SysosLibMxgraphService) {
    this.mx = this.MxgraphService.mx;

    /*const _this = this;
    const urlParams = (function(url)
    {
      let result = {};
      let idx = url.lastIndexOf('?');

      if (idx > 0)
      {
        var params = url.substring(idx + 1).split('&');

        for (var i = 0; i < params.length; i++)
        {
          idx = params[i].indexOf('=');

          if (idx > 0)
          {
            result[params[i].substring(0, idx)] = params[i].substring(idx + 1);
          }
        }
      }

      return result;
    })(window.location.href);

    // Default resources are included in grapheditor resources
    let mxLoadResources = false;

    // Extends EditorUi to update I/O action states based on availability of backend
    const editorUiInit = this.Window.EditorUi.prototype.init;

    this.Window.EditorUi.prototype.init = function() {
      editorUiInit.apply(this, arguments);
      this.actions.get('export').setEnabled(false);

      // Updates action states which require a backend
      if (!_this.Window.Editor.useLocalStorage) {
        _this.mx.mxUtils.post(_this.Window.OPEN_URL, '', _this.mx.mxUtils.bind(this, function(req) {
          const enabled = req.getStatus() != 404;
          this.actions.get('open').setEnabled(enabled || Graph.fileSupport);
          this.actions.get('import').setEnabled(enabled || Graph.fileSupport);
          this.actions.get('save').setEnabled(enabled);
          this.actions.get('saveAs').setEnabled(enabled);
          this.actions.get('export').setEnabled(enabled);
        }));
      }
    };

    // Adds required resources (disables loading of fallback properties, this can only
    // be used if we know that all keys are defined in the language specific file)
    this.mx.mxResources.loadDefaultBundle = true;
    const bundle = this.mx.mxResources.getDefaultBundle(this.Window.RESOURCE_BASE, this.Window.mxLanguage) || this.mx.mxResources.getSpecialBundle(this.Window.RESOURCE_BASE, this.Window.mxLanguage);


    // Fixes possible asynchronous requests
    this.mx.mxUtils.getAll([bundle, '/assets/js/drawer/default.xml'], (xhr) => {
      // Adds bundle text to resources
      this.mx.mxResources.parse(xhr[0].getText());

      // Configures the default graph theme
      const themes = {};
      themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();

      // Main
      new this.Window.EditorUi(new this.Window.Editor(false, themes));
    }, () => {
      document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
    });*/
  }

  ngOnInit() {
    const $this = this;

    // Redirects the perimeter to the label bounds if intersection between edge and label is found
    const mxGraphViewGetPerimeterPoint = this.mx.mxGraphView.getPerimeterPoint;
    this.mx.mxGraphView.getPerimeterPoint = (terminal, next, orthogonal, border) => {
      let point = mxGraphViewGetPerimeterPoint(terminal, next, orthogonal, border);

      if (point !== null) {
        const perimeter = this.mx.mxGraphView.getPerimeterFunction(terminal);

        if (terminal.text !== null && terminal.text.boundingBox != null) {
          // Adds a small border to the label bounds
          const b = terminal.text.boundingBox.clone();
          b.grow(3);

          if (this.mx.mxUtils.rectangleIntersectsSegment(b, point, next)) {
            point = perimeter(b, terminal, next, orthogonal);
          }
        }
      }

      return point;
    };

    const container = document.getElementById('graphContainer');

    // Disables the built-in context menu
    this.mx.mxEvent.disableContextMenu(container);

    const graph = new this.mx.mxGraph(container);
    const parent = graph.getDefaultParent();

    // graph.panningHandler.ignoreCell = true;
    // graph.setPanning(true);
    graph.setEnabled(true);
    graph.setCellsLocked(true);
    graph.setConnectable(true);
    graph.setTooltips(true);
    graph.setHtmlLabels(true);

    // Ports are not used as terminals for edges, they are only used to compute the graphical connection point
    graph.isPort = function(cell) {
      const geo = this.getCellGeometry(cell);

      return (geo != null) ? geo.relative : false;
    };

    // Implements a tooltip that shows the actual source and target of an edge
    graph.getTooltipForCell = function(cell) {
      if (this.model.isEdge(cell)) {
        return `${this.convertValueToString(this.model.getTerminal(cell, true))} => ${this.convertValueToString(this.model.getTerminal(cell, false))}`;
      }

      return $this.mx.mxGraph.prototype.getTooltipForCell(cell);
    };

    // Removes the folding icon and disables any folding
    graph.isCellFoldable = (cell) => {
      return false;
    };

    /**
     * Specifies the size of the size for "tiles" to be used for a graph with
     * scrollbars but no visible background page. A good value is large
     * enough to reduce the number of repaints that is caused for auto-
     * translation, which depends on this value, and small enough to give
     * a small empty buffer around the graph. Default is 400x400.
     */
    // graph.scrollTileSize = new this.mx.mxRectangle(0, 0, 400, 400);

    /**
     * Returns the padding for pages in page view with scrollbars.
     */
    /*graph.getPagePadding = () => {
      return new this.mx.mxPoint(Math.max(0, Math.round(graph.container.offsetWidth - 34)), Math.max(0, Math.round(graph.container.offsetHeight - 34)));
    };*/

    /**
     * Returns the size of the page format scaled with the page size.
     */
    /*graph.getPageSize = function() {
      return (this.pageVisible) ? new _this.mx.mxRectangle(0, 0, this.pageFormat.width * this.pageScale, this.pageFormat.height * this.pageScale) : this.scrollTileSize;
    };*/

    /**
     * Returns a rectangle describing the position and count of the
     * background pages, where x and y are the position of the top,
     * left page and width and height are the vertical and horizontal
     * page count.
     */
    /*graph.getPageLayout = function() {
      const size = (this.pageVisible) ? this.getPageSize() : this.scrollTileSize;
      const bounds = this.getGraphBounds();

      if (bounds.width == 0 || bounds.height == 0) {
        return new _this.mx.mxRectangle(0, 0, 1, 1);
      } else {
        // Computes untransformed graph bounds
        const x = Math.ceil(bounds.x / this.view.scale - this.view.translate.x);
        const y = Math.ceil(bounds.y / this.view.scale - this.view.translate.y);
        const w = Math.floor(bounds.width / this.view.scale);
        const h = Math.floor(bounds.height / this.view.scale);

        const x0 = Math.floor(x / size.width);
        const y0 = Math.floor(y / size.height);
        const w0 = Math.ceil((x + w) / size.width) - x0;
        const h0 = Math.ceil((y + h) / size.height) - y0;

        return new _this.mx.mxRectangle(x0, y0, w0, h0);
      }
    };

    // Fits the number of background pages to the graph
    graph.view.getBackgroundPageBounds = function() {
      const layout = this.graph.getPageLayout();
      const page = this.graph.getPageSize();

      return new _this.mx.mxRectangle(this.scale * (this.translate.x + layout.x * page.width),
        this.scale * (this.translate.y + layout.y * page.height),
        this.scale * layout.width * page.width,
        this.scale * layout.height * page.height);
    };

    graph.getPreferredPageSize = function(bounds, width, height) {
      const pages = this.getPageLayout();
      const size = this.getPageSize();

      return new _this.mx.mxRectangle(0, 0, pages.width * size.width, pages.height * size.height);
    };*/

    /**
     * Guesses autoTranslate to avoid another repaint (see below).
     * Works if only the scale of the graph changes or if pages
     * are visible and the visible pages do not change.
     */
    /* graphViewValidate = graph.view.validate;
    graph.view.validate = function() {
      if (this.graph.container != null && _this.mx.mxUtils.hasScrollbars(this.graph.container)) {
        const pad = this.graph.getPagePadding();
        const size = this.graph.getPageSize();

        // Updating scrollbars here causes flickering in quirks and is not needed
        // if zoom method is always used to set the current scale on the graph.
        const tx = this.translate.x;
        const ty = this.translate.y;
        this.translate.x = pad.x / this.scale - (this.x0 || 0) * size.width;
        this.translate.y = pad.y / this.scale - (this.y0 || 0) * size.height;
      }

      graphViewValidate.apply(this, arguments);
    };

    const graphSizeDidChange = graph.sizeDidChange;
    graph.sizeDidChange = function() {
      if (this.container != null && _this.mx.mxUtils.hasScrollbars(this.container)) {
        const pages = this.getPageLayout();
        const pad = this.getPagePadding();
        const size = this.getPageSize();

        // Updates the minimum graph size
        const minw = Math.ceil(2 * pad.x / this.view.scale + pages.width * size.width);
        const minh = Math.ceil(2 * pad.y / this.view.scale + pages.height * size.height);

        const min = graph.minimumGraphSize;

        // LATER: Fix flicker of scrollbar size in IE quirks mode
        // after delayed call in window.resize event handler
        if (min == null || min.width != minw || min.height != minh) {
          graph.minimumGraphSize = new _this.mx.mxRectangle(0, 0, minw, minh);
        }

        // Updates auto-translate to include padding and graph size
        const dx = pad.x / this.view.scale - pages.x * size.width;
        const dy = pad.y / this.view.scale - pages.y * size.height;

        if (!this.autoTranslate && (this.view.translate.x != dx || this.view.translate.y != dy)) {
          this.autoTranslate = true;
          this.view.x0 = pages.x;
          this.view.y0 = pages.y;

          // NOTE: THIS INVOKES THIS METHOD AGAIN. UNFORTUNATELY THERE IS NO WAY AROUND THIS SINCE THE
          // BOUNDS ARE KNOWN AFTER THE VALIDATION AND SETTING THE TRANSLATE TRIGGERS A REVALIDATION.
          // SHOULD MOVE TRANSLATE/SCALE TO VIEW.
          const tx = graph.view.translate.x;
          const ty = graph.view.translate.y;

          graph.view.setTranslate(dx, dy);
          graph.container.scrollLeft += (dx - tx) * graph.view.scale;
          graph.container.scrollTop += (dy - ty) * graph.view.scale;

          this.autoTranslate = false;
          return;
        }

        graphSizeDidChange.apply(this, arguments);
      }
    };*/

    // Installs a popupmenu handler using local function.
    graph.popupMenuHandler.factoryMethod = (menu, cell, evt) => {
      return console.log(graph, menu, cell, evt);
    };

    // Installs a handler for click events in the graph that toggles the overlay for the respective cell
    graph.addListener(this.mx.mxEvent.CLICK, (sender, evt) => {
      const cell = evt.getProperty('cell');

      if (cell !== null) {
        const overlays = graph.getCellOverlays(cell);

        if (overlays === null) {
          // Creates a new overlay with an image and a tooltip
          const overlay = new this.mx.mxCellOverlay(
            new this.mx.mxImage('editors/images/overlays/check.png', 16, 16),
            'Overlay tooltip');

          // Installs a handler for clicks on the overlay
          overlay.addListener(this.mx.mxEvent.CLICK, (sender2, evt2) => {
            this.mx.mxUtils.alert('Overlay clicked');
          });

          // Sets the overlay for the cell in the graph
          graph.addCellOverlay(cell, overlay);
        } else {
          graph.removeCellOverlays(cell);
        }
      }
    });

    // Installs a handler for double click events in the graph
    // that shows an alert box
    graph.addListener(this.mx.mxEvent.DOUBLE_CLICK, (sender, evt) => {
      const cell = evt.getProperty('cell');
      this.mx.mxUtils.alert('Doubleclick: ' + ((cell != null) ? 'Cell' : 'Graph'));
      evt.consume();
    });

    // Enables rubberband selection
    // new this.mx.mxRubberband(graph);

    // Changes the default vertex style in-place
    let style = graph.getStylesheet().getDefaultVertexStyle();
    style[this.mx.mxConstants.STYLE_SHAPE] = this.mx.mxConstants.SHAPE_HEXAGON;
    style[this.mx.mxConstants.STYLE_EDGE] = this.mx.mxEdgeStyle.ElbowConnector;
    style[this.mx.mxConstants.STYLE_PERIMETER] = this.mx.mxPerimeter.RectanglePerimeter;
    style[this.mx.mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    style[this.mx.mxConstants.STYLE_PERIMETER_SPACING] = 6;
    style[this.mx.mxConstants.STYLE_ROUNDED] = true;
    style[this.mx.mxConstants.STYLE_SHADOW] = true;

    style = graph.getStylesheet().getDefaultEdgeStyle();
    style[this.mx.mxConstants.STYLE_ROUNDED] = true;

    const layout = new this.mx.mxHierarchicalLayout(graph);


    let v1;
    let v2;
    let v3;
    let v4;
    let v4net1;
    let v4net2;
    let v5;
    let v6data1;
    let v6data2;

    let e1;
    let e2;
    let e3;
    let e4;
    let e42;
    let e5;
    let e52;
    let e6;
    let e7;
    let e8;
    // Load cells and layouts the graph
    graph.getModel().beginUpdate();
    try {
      v1 = graph.insertVertex(parent, null, '<i class="vs-icon vsphere-icon-vcenter"></i> 192.168.1.9', 0, 0, 50, 50, 'fillColor=green;verticalLabelPosition=bottom');
      v1.setConnectable(false);

      v2 = graph.insertVertex(parent, null, '<i class="vs-icon vsphere-icon-datacenter"></i> LabDC01', 0, 0, 50, 50, 'fillColor=green;verticalLabelPosition=bottom');
      v2.setConnectable(false);

      v3 = graph.insertVertex(parent, null, '<i class="vs-icon vsphere-icon-cluster"></i> LabCluster01', 0, 0, 50, 50, 'fillColor=green;verticalLabelPosition=bottom');
      v3.setConnectable(false);

      v4 = graph.insertVertex(parent, null, '<i class="vs-icon vsphere-icon-host"></i> 192.168.1.2', 0, 0, 50, 50, 'fillColor=green;verticalLabelPosition=bottom');
      v4.setConnectable(false);

      v4net1 = graph.insertVertex(parent, null, '<i class="vs-icon vsphere-icon-network"></i> Network1', 0, 0, 50, 50, 'fillColor=green;verticalLabelPosition=bottom');
      v4net1.setConnectable(false);

      v4net2 = graph.insertVertex(parent, null, '<i class="vs-icon vsphere-icon-network"></i> Network2', 0, 0, 50, 50, 'fillColor=green;verticalLabelPosition=bottom');
      v4net2.setConnectable(false);

      const v4vdata = graph.insertVertex(v4, null, '', 0, 1, 10, 10);
      v4vdata.geometry.offset = new this.mx.mxPoint(-5, -5);
      v4vdata.geometry.relative = true;
      const v4vvm = graph.insertVertex(v4, null, '', 0.5, 1, 10, 10);
      v4vvm.geometry.offset = new this.mx.mxPoint(-5, -5);
      v4vvm.geometry.relative = true;
      const v4vnet = graph.insertVertex(v4, null, '', 1, 1, 10, 10);
      v4vnet.geometry.offset = new this.mx.mxPoint(-5, -5);
      v4vnet.geometry.relative = true;

      v5 = graph.insertVertex(parent, null, '<i class="vs-icon vsphere-icon-vm-on"></i> labvcenter01', 0, 0, 50, 50, 'fillColor=green;verticalLabelPosition=bottom');
      v5.setConnectable(false);

      v6data1 = graph.insertVertex(parent, null, '<i class="vs-icon vsphere-icon-datastore"></i> Datastore1', 0, 0, 50, 50, 'fillColor=green;verticalLabelPosition=bottom');
      v6data1.setConnectable(false);

      v6data2 = graph.insertVertex(parent, null, '<i class="vs-icon vsphere-icon-datastore"></i> Datastore2', 0, 0, 50, 50, 'fillColor=green;verticalLabelPosition=bottom;shape=mxgraph.gcp2.hexIcon');
      v6data2.setConnectable(false);


      e1 = graph.insertEdge(parent, null, '', v1, v2);
      e2 = graph.insertEdge(parent, null, '', v2, v3);
      e3 = graph.insertEdge(parent, null, '', v3, v4);
      e4 = graph.insertEdge(parent, null, '', v4vnet, v4net1);
      e42 = graph.insertEdge(parent, null, '', v4vnet, v4net2);
      e5 = graph.insertEdge(parent, null, '', v4vvm, v5, 'strokeWidth=3;endArrow=block;endSize=2;endFill=1;strokeColor=black;rounded=1;');
      e52 = graph.insertEdge(parent, null, '', v5, v4net2);
      e6 = graph.insertEdge(parent, null, '', v4vdata, v6data1);
      e7 = graph.insertEdge(parent, null, '', v4vdata, v6data2);
      e8 = graph.insertEdge(parent, null, '', v5, v6data1);

      // Executes the layout
      layout.execute(parent);

      const f = () => {
        const overlays = graph.getCellOverlays(v1);

        if (overlays === null) {
          graph.removeCellOverlays(v5);
          graph.setCellWarning(v1, 'Tooltip');
        } else {
          graph.removeCellOverlays(v1);
          graph.setCellWarning(v5, 'Tooltip');
        }
      };

      window.setInterval(f, 1000);
      f();

    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }

    const v1state = graph.view.getState(v1);
    v1state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'border-grey');

    const v2state = graph.view.getState(v2);
    v2state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'vs-icon vsphere-icon-datacenterborder-grey');

    const v3state = graph.view.getState(v3);
    v3state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'border-grey');

    const v4state = graph.view.getState(v4);
    v4state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'border-grey');

    const v5state = graph.view.getState(v5);
    v5state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'border-blink-green');

    const v6state = graph.view.getState(v6data1);
    v6state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'border-grey');

    const v7state = graph.view.getState(v6data2);
    v7state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'border-blink-red');

    const e5state = graph.view.getState(e5);
    e5state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
    e5state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', '6');
    e5state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'lightGray');
    e5state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'flow');

  }
}
