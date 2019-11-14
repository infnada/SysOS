import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnyOpsOSLibAngularMaterialModule} from '@anyopsos/lib-angular-material';

import {AnyOpsOSLibUtilsModule} from '@anyopsos/lib-utils';
import {AnyOpsOSLibSanitizeModule} from '@anyopsos/lib-sanitize';

import {AnyOpsOSLibExtWeavescopeComponent} from './components/anyopsos-lib-ext-weavescope.component';
import {LoadingComponent} from './components/loading/loading.component';
import {NodesErrorComponent} from './components/nodes-error/nodes-error.component';
import {NodesChartComponent} from './components/charts/nodes-chart/nodes-chart.component';
import {ZoomableCanvasComponent} from './components/zoomable-canvas/zoomable-canvas.component';
import {NodesChartElementsComponent} from './components/charts/nodes-chart-elements/nodes-chart-elements.component';
import {NodeContainerComponent} from './components/charts/node-container/node-container.component';
import {EdgeContainerComponent} from './components/charts/edge-container/edge-container.component';
import {GraphNodeComponent} from './components/charts/graph-node/graph-node.component';
import {GraphNodeStaticComponent} from './components/charts/graph-node-static/graph-node-static.component';
import {ShapeComponent} from './components/charts/shape/shape.component';
import {MatchedTextComponent} from './components/charts/matched-text/matched-text.component';
import {EdgeComponent} from './components/charts/edge/edge.component';
import {SearchComponent} from './components/search/search.component';
import {TopologiesComponent} from './components/topologies/topologies.component';
import {MetricsComponent} from './components/metrics/metrics.component';
import {TopologyOptionsComponent} from './components/topology-options/topology-options.component';

@NgModule({
  declarations: [
    AnyOpsOSLibExtWeavescopeComponent,
    LoadingComponent,
    NodesErrorComponent,
    NodesChartComponent,
    ZoomableCanvasComponent,
    NodesChartElementsComponent,
    NodeContainerComponent,
    EdgeContainerComponent,
    GraphNodeComponent,
    GraphNodeStaticComponent,
    ShapeComponent,
    MatchedTextComponent,
    EdgeComponent,
    SearchComponent,
    TopologiesComponent,
    MetricsComponent,
    TopologyOptionsComponent
  ],
  imports: [
    CommonModule,
    // Shared module import
    AnyOpsOSLibUtilsModule,
    AnyOpsOSLibSanitizeModule,
    AnyOpsOSLibAngularMaterialModule
  ],
  exports: [
    AnyOpsOSLibExtWeavescopeComponent,
  ]
})
export class AnyOpsOSLibExtWeavescopeModule {
}
