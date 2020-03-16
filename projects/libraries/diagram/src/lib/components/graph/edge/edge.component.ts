import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {AnyOpsOSLibDiagramStateService} from '../../../services/anyopsos-lib-diagram-state.service';
import {AnyOpsOSLibDiagramDomUtilsService} from '../../../services/anyopsos-lib-diagram-dom-utils.service';
import {STORAGE_COMPONENTS} from '../../../anyopsos-lib-diagram.constants';
import {LayoutEdge} from '../../../types/layout-edge';

@Component({
  selector: '[aldiagram-edge]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EdgeComponent {
  @Input() edgeElement: LayoutEdge;
  @Input() thickness: number;
  @Input() path: {
    x: number;
    y:number;
  }[];

  encodeIdAttribute = this.LibDiagramDomUtils.encodeIdAttribute;

  constructor(private readonly LibDiagramState: AnyOpsOSLibDiagramStateService,
              private readonly LibDiagramDomUtils: AnyOpsOSLibDiagramDomUtilsService) {
  }

  private static isStorageComponent(id: string): boolean {
    return STORAGE_COMPONENTS.includes(id);
  }

  // getAdjacencyClass takes id which contains information about edge as a topology
  // of parent and child node.
  // For example: id is of form "nodeA;<storage_class>---nodeB;<persistent_volume_claim>"
  getAdjacencyClass(id: string): string {
    const topologyId = id.split('---');
    const fromNode = topologyId[0].split(';');
    const toNode = topologyId[1].split(';');
    if (fromNode[1] !== undefined && toNode[1] !== undefined) {
      if (EdgeComponent.isStorageComponent(fromNode[1]) || EdgeComponent.isStorageComponent(toNode[1])) {
        return 'link-storage';
      }
    }
    return 'link-none';
  }

  private enterEdge(edgeId: string): void {
    this.LibDiagramState.setMouseOverEdgeId(edgeId);
  }

  private leaveEdge(): void {
    this.LibDiagramState.setMouseOverEdgeId(null);
  }

  handleMouseEnter(ev): void {
    this.enterEdge(this.LibDiagramDomUtils.decodeIdAttribute(ev.currentTarget.id));
  }

  handleMouseLeave(): void {
    this.leaveEdge();
  }

}
