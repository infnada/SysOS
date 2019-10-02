import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/lib-application';
import {SysosLibExtMxgraphService} from '@sysos/lib-ext-mxgraph';

import {VMWareObject} from '../../types/vmware-object';

@Component({
  selector: 'saim-body-vmware',
  templateUrl: './body-vmware.component.html',
  styleUrls: ['./body-vmware.component.scss']
})
export class BodyVmwareComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;
  @Input() application: Application;

  private mx;
  private graph;
  private defaultGraphOverflow = 'hidden';

  constructor(private MxgraphService: SysosLibExtMxgraphService) {
    this.mx = this.MxgraphService.mx;
  }

  ngOnInit() {
    const container = document.getElementById('vmwareGraphContainer');
    this.graph = new this.mx.mxGraph(container);
    this.graph.setGridEnabled(true);
    this.graph.setGridSize(10);
    this.graph.setTooltips(true);
    this.graph.setConnectable(true);
    this.graph.setHtmlLabels(true);
    this.graph.setEnabled(true);
    this.graph.setCellsLocked(true);

    const parent = this.graph.getDefaultParent();
    const layout = new this.mx.mxHierarchicalLayout(this.graph);
    // tslint:disable:max-line-length
    const xml = `<mxGraphModel dx="1422" dy="764" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="#ffffff" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="406" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="371" target="384" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="648.5" y="550"/>
              <mxPoint x="648.5" y="440"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="407" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="371" target="380" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="648.5" y="550"/>
              <mxPoint x="648.5" y="235"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="371" value="Streaming" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=#4284F3;gradientColor=none;shadow=0;dashed=1;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=none;dashPattern=1 2;strokeWidth=2;" parent="1" vertex="1">
          <mxGeometry x="428.5" y="465" width="170" height="170" as="geometry"/>
        </mxCell>
        <mxCell id="341" value="Streaming" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=#4284F3;gradientColor=none;shadow=0;dashed=1;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=none;dashPattern=1 2;strokeWidth=2;" parent="1" vertex="1">
          <mxGeometry x="100.5" y="95" width="508" height="210" as="geometry"/>
        </mxCell>
        <mxCell id="397" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="340" target="361" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="234.5" y="255"/>
              <mxPoint x="234.5" y="255"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="340" value="On-Premises&lt;br&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Applications&lt;/font&gt;&lt;br&gt;" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=none;gradientColor=none;shadow=0;dashed=0;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=#EFEBE9;" parent="1" vertex="1">
          <mxGeometry x="110.5" y="165" width="110" height="130" as="geometry"/>
        </mxCell>
        <mxCell id="338" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;" parent="1" vertex="1">
          <mxGeometry x="130.5" y="215" width="70" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="339" value="" style="dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;shape=mxgraph.gcp2.application;part=1;" parent="338" vertex="1">
          <mxGeometry x="0.5" width="50" height="40" relative="1" as="geometry">
            <mxPoint x="-25" y="15" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="355" value="Batch" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=#4284F3;gradientColor=none;shadow=0;dashed=1;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=none;dashPattern=1 2;strokeWidth=2;" parent="1" vertex="1">
          <mxGeometry x="100.5" y="375" width="308" height="210" as="geometry"/>
        </mxCell>
        <mxCell id="401" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="356" target="365" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="228.5" y="440"/>
              <mxPoint x="228.5" y="440"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="356" value="On-Premises&lt;br&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Databases&lt;/font&gt;&lt;br&gt;" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=none;gradientColor=none;shadow=0;dashed=0;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=#EFEBE9;" parent="1" vertex="1">
          <mxGeometry x="110.5" y="403.5" width="110" height="130" as="geometry"/>
        </mxCell>
        <mxCell id="357" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;" parent="1" vertex="1">
          <mxGeometry x="130.5" y="452.5" width="70" height="69" as="geometry"/>
        </mxCell>
        <mxCell id="358" value="" style="dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;shape=mxgraph.gcp2.database;part=1;" parent="357" vertex="1">
          <mxGeometry x="0.5" width="50" height="45" relative="1" as="geometry">
            <mxPoint x="-25" y="12.5" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="398" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="359" target="361" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="328.5" y="215"/>
              <mxPoint x="328.5" y="215"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="359" value="" style="shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="248.5" y="121" width="160" height="68" as="geometry"/>
        </mxCell>
        <mxCell id="360" value="&lt;font color=&quot;#000000&quot;&gt;Cloud Apps&lt;/font&gt;&lt;br&gt;Compute Engine" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=compute_engine;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;" parent="359" vertex="1">
          <mxGeometry y="0.5" width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="-19.5" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="399" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="361" target="363" edge="1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="361" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="248.5" y="220" width="150" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="362" value="&lt;font color=&quot;#000000&quot;&gt;Streaming&lt;/font&gt;&lt;br&gt;Cloud Pub/Sub&lt;hr&gt;&lt;font style=&quot;font-size: 11px&quot;&gt;Transactions&lt;/font&gt;" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=cloud_pubsub;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;" parent="361" vertex="1">
          <mxGeometry width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="7" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="400" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=0.5;exitY=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="363" target="369" edge="1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="405" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="363" target="371" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="618.5" y="255"/>
              <mxPoint x="618.5" y="435"/>
              <mxPoint x="528.5" y="435"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="363" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="430.5" y="220" width="168" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="364" value="&lt;font color=&quot;#000000&quot;&gt;Processing&lt;/font&gt;&lt;br&gt;Cloud Dataflow&lt;hr&gt;&lt;font style=&quot;font-size: 11px&quot;&gt;Transaction Streams&lt;/font&gt;" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=cloud_dataflow;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;" parent="363" vertex="1">
          <mxGeometry width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="7" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="403" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="365" target="371" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="498.5" y="435"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="404" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="365" target="369" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="498.5" y="435"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="365" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="248.5" y="405" width="150" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="366" value="&lt;font color=&quot;#000000&quot;&gt;ETL&lt;/font&gt;&lt;br&gt;Cloud Dataflow&lt;hr&gt;&lt;font style=&quot;font-size: 11px&quot;&gt;Transform Data&lt;/font&gt;" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=cloud_dataflow;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;" parent="365" vertex="1">
          <mxGeometry width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="7" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="402" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=0.5;exitY=0;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="367" target="365" edge="1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="367" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="248.5" y="515" width="150" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="368" value="&lt;font color=&quot;#000000&quot;&gt;Cloud Data&lt;/font&gt;&lt;br&gt;Cloud Storage" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=cloud_storage;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;" parent="367" vertex="1">
          <mxGeometry y="0.5" width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="-19.5" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="369" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="433" y="335" width="163" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="370" value="&lt;font color=&quot;#000000&quot;&gt;Processed Events&lt;/font&gt;&lt;br&gt;Cloud Bigtable&lt;hr&gt;&lt;font style=&quot;font-size: 11px&quot;&gt;Events Time Series&lt;/font&gt;" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=cloud_bigtable;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;" parent="369" vertex="1">
          <mxGeometry width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="7" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="372" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="439.5" y="495" width="150" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="373" value="&lt;font color=&quot;#000000&quot;&gt;Rules Engine&lt;/font&gt;&lt;br&gt;Cloud Dataflow" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=cloud_dataflow;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;" parent="372" vertex="1">
          <mxGeometry y="0.5" width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="-19.5" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="374" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="439.5" y="565" width="150" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="375" value="&lt;font color=&quot;#000000&quot;&gt;Rules Engine&lt;/font&gt;&lt;br&gt;Cloud Dataproc" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=cloud_dataproc;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;" parent="374" vertex="1">
          <mxGeometry y="0.5" width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="-19.5" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="408" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="376" target="388" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="888.5" y="145"/>
              <mxPoint x="888.5" y="145"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="376" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="680.5" y="115" width="158" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="377" value="&lt;font color=&quot;#000000&quot;&gt;Push to Devices&lt;/font&gt;&lt;br&gt;App Engine" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=app_engine;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;" parent="376" vertex="1">
          <mxGeometry y="0.5" width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="-19.5" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="409" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="380" target="376" edge="1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="410" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="380" target="382" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="759.5" y="295"/>
              <mxPoint x="759.5" y="295"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="380" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="680.5" y="200" width="158" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="381" value="&lt;font color=&quot;#000000&quot;&gt;Messaging&lt;/font&gt;&lt;br&gt;Cloud Pub/Sub&lt;hr&gt;&lt;font style=&quot;font-size: 11px&quot;&gt;Rules Actions&lt;/font&gt;" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=cloud_pubsub;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;" parent="380" vertex="1">
          <mxGeometry width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="7" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="382" value="" style="shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="680.5" y="301" width="168" height="68" as="geometry"/>
        </mxCell>
        <mxCell id="383" value="&lt;font color=&quot;#000000&quot;&gt;Cloud Apps&lt;/font&gt;&lt;br&gt;Compute Engine" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=compute_engine;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;" parent="382" vertex="1">
          <mxGeometry y="0.5" width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="-19.5" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="411" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="384" target="391" edge="1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="412" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=0;labelBackgroundColor=none;startArrow=none;startFill=0;startSize=4;endArrow=blockThin;endFill=1;endSize=4;strokeColor=#4284F3;strokeWidth=2;fontSize=12;" parent="1" source="384" target="386" edge="1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="759.5" y="505"/>
              <mxPoint x="759.5" y="505"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="384" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="680.5" y="405" width="157" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="385" value="&lt;font color=&quot;#000000&quot;&gt;Data Warehouse&lt;/font&gt;&lt;br&gt;BigQuery&lt;hr&gt;&lt;font style=&quot;font-size: 11px&quot;&gt;Execution Results&lt;/font&gt;" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=bigquery;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;" parent="384" vertex="1">
          <mxGeometry width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="7" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="386" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;fontSize=12;fontColor=#9E9E9E;align=center;html=1;" parent="1" vertex="1">
          <mxGeometry x="680.5" y="515" width="158" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="387" value="&lt;font color=&quot;#000000&quot;&gt;Data Analysis&lt;/font&gt;&lt;br&gt;Cloud Datalab" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=cloud_datalab;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;" parent="386" vertex="1">
          <mxGeometry y="0.5" width="44" height="39" relative="1" as="geometry">
            <mxPoint x="5" y="-19.5" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="388" value="Mobile Devices&lt;br&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Push Notification&lt;/font&gt;&lt;br&gt;" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=none;gradientColor=none;shadow=0;dashed=0;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=#F1F8E9;" parent="1" vertex="1">
          <mxGeometry x="898.5" y="95" width="110" height="130" as="geometry"/>
        </mxCell>
        <mxCell id="389" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;" parent="1" vertex="1">
          <mxGeometry x="918.5" y="140" width="70" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="390" value="" style="dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;shape=mxgraph.gcp2.mobile_devices;part=1;" parent="389" vertex="1">
          <mxGeometry x="0.5" width="50" height="36.5" relative="1" as="geometry">
            <mxPoint x="-25" y="16.75" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="391" value="Report &amp;amp; Share&lt;br&gt;&lt;font style=&quot;font-size: 10px&quot;&gt;Business Analysis&lt;/font&gt;&lt;br&gt;" style="rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=none;gradientColor=none;shadow=0;dashed=0;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=#F3E5F5;" parent="1" vertex="1">
          <mxGeometry x="898.5" y="376" width="170" height="128" as="geometry"/>
        </mxCell>
        <mxCell id="392" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;" parent="1" vertex="1">
          <mxGeometry x="908.5" y="423" width="70" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="393" value="" style="dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;shape=mxgraph.gcp2.report;part=1;" parent="392" vertex="1">
          <mxGeometry x="0.5" width="50" height="50" relative="1" as="geometry">
            <mxPoint x="-25" y="10" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="394" value="" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;" parent="1" vertex="1">
          <mxGeometry x="988.5" y="423" width="70" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="395" value="" style="dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;shape=mxgraph.gcp2.users;part=1;" parent="394" vertex="1">
          <mxGeometry x="0.5" width="50" height="31.5" relative="1" as="geometry">
            <mxPoint x="-25" y="19.25" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-428" value="labvcenter01" style="dashed=0;connectable=0;html=1;fillColor=#4F77F8;strokeColor=#b85450;shape=mxgraph.gcp2.hexIcon;prIcon=cloud_datalab;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontSize=12;backgroundOutline=0;fontColor=#999999;" parent="1" vertex="1">
          <mxGeometry x="630" y="652" width="110" height="99" as="geometry">
            <mxPoint x="5" y="-19.5" as="offset"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-473" value="" style="group" parent="1" vertex="1" connectable="0">
          <mxGeometry x="138.5" y="951" width="185" height="90" as="geometry"/>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-465" value="vCenter01" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;comic=0;labelBackgroundColor=none;fontColor=#999999;align=right;spacingRight=10;" parent="BM0QDaschT9D0tTKIbzK-473" vertex="1">
          <mxGeometry width="185" height="90" as="geometry"/>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-463" value="" style="pointerEvents=1;shadow=0;dashed=0;strokeColor=#82b366;fillColor=#FFFF33;aspect=fixed;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=left;outlineConnect=0;shape=mxgraph.vvd.vcenter_server;rounded=0;comic=0;labelBackgroundColor=none;strokeWidth=2;noLabel=0;gradientDirection=east;perimeterSpacing=0;html=1;connectable=0;movable=0;resizable=0;rotatable=0;recursiveResize=0;editable=0;" parent="BM0QDaschT9D0tTKIbzK-473" vertex="1">
          <mxGeometry x="31" y="20" width="48" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-475" value="" style="group" parent="1" vertex="1" connectable="0">
          <mxGeometry x="473" y="940" width="205" height="112" as="geometry"/>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-444" value="labvcenter01" style="strokeColor=#dddddd;fillColor=#ffffff;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;comic=0;labelBackgroundColor=none;fontColor=#999999;spacingRight=10;align=right;" parent="BM0QDaschT9D0tTKIbzK-475" vertex="1">
          <mxGeometry y="22" width="205" height="90" as="geometry"/>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-431" value="" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fillColor=#8FE854;strokeColor=#ADADAD;rounded=0;comic=0;shadow=0;connectable=0;gradientDirection=north;gradientColor=#FF0303;perimeterSpacing=1;labelBackgroundColor=#ffffff;strokeOpacity=100;recursiveResize=0;editable=0;movable=0;resizable=0;rotatable=0;" parent="BM0QDaschT9D0tTKIbzK-475" vertex="1">
          <mxGeometry x="33" y="35.5" width="70" height="67" as="geometry"/>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-420" value="" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fillColor=#8FE854;strokeColor=#ABABAB;gradientColor=#FF3C00;rounded=0;comic=0;shadow=0;connectable=0;gradientDirection=north;recursiveResize=0;editable=0;movable=0;resizable=0;rotatable=0;" parent="BM0QDaschT9D0tTKIbzK-475" vertex="1">
          <mxGeometry x="7" y="35.5" width="70" height="67" as="geometry"/>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-435" value="" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;comic=0;labelBackgroundColor=#9408FF;strokeColor=none;fillColor=#ffffff;gradientColor=none;recursiveResize=0;resizable=0;rotatable=0;cloneable=0;editable=0;connectable=0;" parent="BM0QDaschT9D0tTKIbzK-475" vertex="1">
          <mxGeometry x="5" y="15.5" width="32" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-437" value="" style="rounded=0;whiteSpace=wrap;html=1;shadow=0;comic=0;labelBackgroundColor=#9408FF;strokeColor=none;fillColor=#ffffff;gradientColor=none;connectable=0;recursiveResize=0;editable=0;resizable=0;rotatable=0;cloneable=0;" parent="BM0QDaschT9D0tTKIbzK-475" vertex="1">
          <mxGeometry x="71" width="32" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="BM0QDaschT9D0tTKIbzK-448" value="" style="dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;shape=mxgraph.gcp2.hexIcon;prIcon=compute_engine;part=0;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=-15;fontColor=#999999;fontSize=12;backgroundOutline=0;resizable=0;movable=0;rotatable=0;editable=0;recursiveResize=0;" parent="BM0QDaschT9D0tTKIbzK-475" vertex="1">
          <mxGeometry x="-1" y="19.5" width="110" height="99" as="geometry">
            <mxPoint x="22" y="-19.5" as="offset"/>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>`;
    let node = this.mx.mxUtils.parseXml(xml);
    const dec = new this.mx.mxCodec(node.documentElement);
    node = node.documentElement;

    if (node.nodeName === 'mxGraphModel') {
      this.graph.model.beginUpdate();

      try {
        this.graph.model.clear();
        this.graph.view.scale = 1;
        this.readGraphState(node);
        this.updateGraphComponents();
        dec.decode(node, this.graph.getModel());
      } finally {
        this.graph.model.endUpdate();
      }

      this.graph.fireEvent(new this.mx.mxEventObject('resetGraphView'));
    }


    // layout.execute(parent);
  }

  readGraphState(node) {
    this.graph.gridEnabled = node.getAttribute('grid') !== '0';
    this.graph.gridSize = parseFloat(node.getAttribute('gridSize')) || this.mx.mxGraph.prototype.gridSize;
    this.graph.graphHandler.guidesEnabled = node.getAttribute('guides') !== '0';
    this.graph.setTooltips(node.getAttribute('tooltips') !== '0');
    this.graph.setConnectable(node.getAttribute('connect') !== '0');
    this.graph.connectionArrowsEnabled = node.getAttribute('arrows') !== '0';
    this.graph.foldingEnabled = node.getAttribute('fold') !== '0';

    if (this.graph.foldingEnabled) {
      this.graph.foldingEnabled = false;
      this.graph.cellRenderer.forceControlClickHandler = this.graph.foldingEnabled;
    }

    const ps = parseFloat(node.getAttribute('pageScale'));

    if (!isNaN(ps) && ps > 0) {
      this.graph.pageScale = ps;
    } else {
      this.graph.pageScale = this.mx.mxGraph.prototype.pageScale;
    }

    const pv = node.getAttribute('page');

    if (pv != null) {
      this.graph.pageVisible = (pv !== '0');
    } else {
      this.graph.pageVisible = this.graph.defaultPageVisible;
    }

    this.graph.pageBreaksVisible = this.graph.pageVisible;
    this.graph.preferPageSize = this.graph.pageBreaksVisible;

    const pw = parseFloat(node.getAttribute('pageWidth'));
    const ph = parseFloat(node.getAttribute('pageHeight'));

    if (!isNaN(pw) && !isNaN(ph)) {
      this.graph.pageFormat = new this.mx.mxRectangle(0, 0, pw, ph);
    }

    // Loads the persistent state settings
    const bg = node.getAttribute('background');

    if (bg != null && bg.length > 0) {
      this.graph.background = bg;
    } else {
      this.graph.background = null;
    }
  }

  updateGraphComponents() {
    const graph = this.graph;

    if (graph.container != null) {
      graph.view.validateBackground();
      graph.container.style.overflow = (graph.scrollbars) ? 'auto' : this.defaultGraphOverflow;

      this.graph.fireEvent(new this.mx.mxEventObject('updateGraphComponents'));
    }
  }

  resetGraph() {
    this.graph.gridEnabled = false;
    this.graph.graphHandler.guidesEnabled = true;
    this.graph.setTooltips(true);
    this.graph.setConnectable(true);
    this.graph.foldingEnabled = true;
    this.graph.scrollbars = this.graph.defaultScrollbars;
    this.graph.pageVisible = this.graph.defaultPageVisible;
    this.graph.pageBreaksVisible = this.graph.pageVisible;
    this.graph.preferPageSize = this.graph.pageBreaksVisible;
    this.graph.background = null;
    this.graph.pageScale = this.mx.mxGraph.prototype.pageScale;
    this.graph.pageFormat = this.mx.mxGraph.prototype.pageFormat;
    this.graph.currentScale = 1;
    this.graph.currentTranslate.x = 0;
    this.graph.currentTranslate.y = 0;
    this.updateGraphComponents();
    this.graph.view.setScale(1);
  }

}
