import {Component, Input, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {encodeIdAttribute, decodeIdAttribute} from 'weavescope/client/app/scripts/utils/dom-utils';

import {StateService} from '../../../services/state.service';

@Component({
  selector: '[slews-edge]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss']
})
export class EdgeComponent implements OnDestroy {
  @Input() id;
  @Input() path;
  @Input() highlighted;
  @Input() focused;
  @Input() thickness;
  @Input() source;
  @Input() target;

  private destroySubject$: Subject<void> = new Subject();
  private state;

  encodeIdAttribute = encodeIdAttribute;

  private contrastMode;

  constructor(private State: StateService) {
    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.state = state;
      this.contrastMode = state.get('contrastMode');
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  isStorageComponent(id) {
    const storageComponents = ['<persistent_volume>', '<storage_class>', '<persistent_volume_claim>', '<volume_snapshot>', '<volume_snapshot_data>'];
    return storageComponents.includes(id);
  }

  // getAdjacencyClass takes id which contains information about edge as a topology
  // of parent and child node.
  // For example: id is of form "nodeA;<storage_class>---nodeB;<persistent_volume_claim>"
  getAdjacencyClass(id) {
    const topologyId = id.split('---');
    const fromNode = topologyId[0].split(';');
    const toNode = topologyId[1].split(';');
    if (fromNode[1] !== undefined && toNode[1] !== undefined) {
      if (this.isStorageComponent(fromNode[1]) || this.isStorageComponent(toNode[1])) {
        return 'link-storage';
      }
    }
    return 'link-none';
  }

  enterEdge(edgeId) {
    this.state = this.state.set('mouseOverEdgeId', edgeId);
    this.State.setState(this.state);
  }

  leaveEdge(edgeId) {
    this.state = this.state.set('mouseOverEdgeId', null);
    this.State.setState(this.state);
  }

  handleMouseEnter(ev) {
    this.enterEdge(decodeIdAttribute(ev.currentTarget.id));
  }

  handleMouseLeave(ev) {
    this.leaveEdge(decodeIdAttribute(ev.currentTarget.id));
  }

}
