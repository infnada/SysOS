import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibPipesModule} from '@anyopsos/lib-pipes';

import {ZoomableCanvasComponent} from './components/zoomable-canvas/zoomable-canvas.component';
import {MatchedTextComponent} from './components/matched-text/matched-text.component';
import {NodesChartElementsComponent} from './components/graph/nodes-chart-elements/nodes-chart-elements.component';
import {EdgeContainerComponent} from './components/graph/edge-container/edge-container.component';
import {NodeContainerComponent} from './components/graph/node-container/node-container.component';
import {EdgeComponent} from './components/graph/edge/edge.component';
import {NodeComponent} from './components/graph/node/node.component';
import {NodeStaticComponent} from './components/graph/node-static/node-static.component';
import {ShapeComponent} from './components/graph/shape/shape.component';
import {AnyOpsOSLibDiagramComponent} from './components/anyopsos-lib-diagram.component';
import { SearchComponent } from './components/search/search.component';
import { TopologiesComponent } from './components/topologies/topologies.component';
import { TopologyOptionsComponent } from './components/topology-options/topology-options.component';
import { MetricsComponent } from './components/metrics/metrics.component';

@NgModule({
  declarations: [ZoomableCanvasComponent, NodesChartElementsComponent, EdgeContainerComponent, NodeContainerComponent, EdgeComponent, NodeComponent, NodeStaticComponent, MatchedTextComponent, ShapeComponent, AnyOpsOSLibDiagramComponent, SearchComponent, TopologiesComponent, TopologyOptionsComponent, MetricsComponent],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibPipesModule,
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [
    AnyOpsOSLibDiagramComponent
  ]
})
export class AnyOpsOSLibDiagramModule {
}
