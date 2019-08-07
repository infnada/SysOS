import {Component, OnInit} from '@angular/core';

import {mxgraph, mx} from "../types/mxgraph";
import {mxPoint} from "../types/mx-point";

@Component({
  selector: 'sadrw-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  private mx: mxgraph = mx;

  constructor() {
  }

  ngOnInit() {
    const _this = this;

    // Redirects the perimeter to the label bounds if intersection between edge and label is found
    const mxGraphViewGetPerimeterPoint = this.mx.mxGraphView.getPerimeterPoint;
    this.mx.mxGraphView.getPerimeterPoint = (terminal, next, orthogonal, border): mxPoint => {
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
    const graph = new this.mx.mxGraph(container);
    const parent = graph.getDefaultParent();

    graph.setEnabled(true);
    graph.setCellsLocked(true);
    graph.setConnectable(true);
    graph.setTooltips(true);

    // Ports are not used as terminals for edges, they are only used to compute the graphical connection point
    graph.isPort = function (cell) {
      const geo = this.getCellGeometry(cell);

      return (geo != null) ? geo.relative : false;
    };

    // Implements a tooltip that shows the actual source and target of an edge
    graph.getTooltipForCell = function (cell) {
      if (this.model.isEdge(cell)) {
        return `${this.convertValueToString(this.model.getTerminal(cell, true))} => ${this.convertValueToString(this.model.getTerminal(cell, false))}`
      }

      return _this.mx.mxGraph.prototype.getTooltipForCell(cell);
    };

    // Removes the folding icon and disables any folding
    graph.isCellFoldable = (cell) => {
      return false;
    };

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
          overlay.addListener(this.mx.mxEvent.CLICK, (sender, evt2) => {
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
    new this.mx.mxRubberband(graph);

    // Changes the default vertex style in-place
    let style = graph.getStylesheet().getDefaultVertexStyle();
    style[this.mx.mxConstants.STYLE_EDGE] = this.mx.mxEdgeStyle.ElbowConnector;
    style[this.mx.mxConstants.STYLE_PERIMETER] = this.mx.mxPerimeter.RectanglePerimeter;
    style[this.mx.mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    style[this.mx.mxConstants.STYLE_PERIMETER_SPACING] = 6;
    style[this.mx.mxConstants.STYLE_ROUNDED] = true;
    style[this.mx.mxConstants.STYLE_SHADOW] = true;

    style = graph.getStylesheet().getDefaultEdgeStyle();
    style[this.mx.mxConstants.STYLE_ROUNDED] = true;

    const layout = new this.mx.mxHierarchicalLayout(graph);


    // Load cells and layouts the graph
    graph.getModel().beginUpdate();
    try {
      let v1 = graph.insertVertex(parent, null, '<span><i class="vs-icon vsphere-icon-vcenter"></i> 192.168.1.9</span>', 0, 0, 80, 30, 'fillColor=green;verticalLabelPosition=bottom');
      v1.setConnectable(false);
      let v11 = graph.insertVertex(v1, null, '', 1, 1, 10, 10);
      v11.geometry.offset = new this.mx.mxPoint(-5, -5);
      v11.geometry.relative = true;
      let v12 = graph.insertVertex(v1, null, '', 1, 0, 10, 10);
      v12.geometry.offset = new this.mx.mxPoint(-5, -5);
      v12.geometry.relative = true;
      let v2 = graph.insertVertex(parent, null, '<span><i class="vs-icon vsphere-icon-datacenter"></i> LabDC01</span>', 0, 0, 80, 30, 'fillColor=blue;verticalLabelPosition=bottom');
      let v3 = graph.insertVertex(parent, null, '<span><i class="vs-icon vsphere-icon-vm-on"></i> labvcenter01</span>', 0, 0, 80, 30, 'verticalLabelPosition=bottom');
      let v4 = graph.insertVertex(parent, null, '<span><i class="vs-icon vsphere-icon-cluster"></i> LabCluster01</span>', 0, 0, 80, 30, 'verticalLabelPosition=bottom');
      let v5 = graph.insertVertex(parent, null, '<span><i class="vs-icon vsphere-icon-host"></i> 192.168.1.2</span>', 0, 0, 80, 30, 'verticalLabelPosition=bottom');
      let v6 = graph.insertVertex(parent, null, '6', 0, 0, 80, 30, 'verticalLabelPosition=bottom');
      let v7 = graph.insertVertex(parent, null, '7', 0, 0, 80, 30, 'verticalLabelPosition=bottom');
      let v8 = graph.insertVertex(parent, null, '8', 0, 0, 80, 30, 'verticalLabelPosition=bottom');
      let v9 = graph.insertVertex(parent, null, '9', 0, 0, 80, 30, 'verticalLabelPosition=bottom');

      let e1 = graph.insertEdge(parent, null, '', v11, v2);
      let e2 = graph.insertEdge(parent, null, '', v12, v3);
      let e3 = graph.insertEdge(parent, null, '', v3, v4);
      let e4 = graph.insertEdge(parent, null, '', v2, v5);
      let e5 = graph.insertEdge(parent, null, '', v11, v6);
      let e6 = graph.insertEdge(parent, null, '', v2, v3);
      let e7 = graph.insertEdge(parent, null, '', v6, v4);
      let e8 = graph.insertEdge(parent, null, '', v6, v12);
      let e9 = graph.insertEdge(parent, null, '', v6, v7);
      let e10 = graph.insertEdge(parent, null, '', v7, v8);
      let e11 = graph.insertEdge(parent, null, '', v7, v9);
      let e12 = graph.insertEdge(parent, null, '', v7, v6);
      let e13 = graph.insertEdge(parent, null, '', v7, v5);

      // Executes the layout
      layout.execute(parent);

      const f = () => {
        const overlays = graph.getCellOverlays(v1);

        if (overlays == null) {
          graph.removeCellOverlays(v2);
          graph.setCellWarning(v1, 'Tooltip');
        } else {
          graph.removeCellOverlays(v1);
          graph.setCellWarning(v2, 'Tooltip');
        }
      };

      window.setInterval(f, 1000);
      f();

    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }
  }
}
