import {Component, ElementRef, Input, OnDestroy} from '@angular/core';
import {List as makeList} from 'immutable';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {getNetworkColor} from 'weavescope/client/app/scripts/utils/color-utils';

import {StateService} from '../../../services/state.service';
import {NodeDetailsUtilsService} from '../../../services/utils/node-details-utils.service';

@Component({
  selector: '[aelweaves-graph-node-static]',
  templateUrl: './graph-node-static.component.html',
  styleUrls: ['./graph-node-static.component.scss']
})
export class GraphNodeStaticComponent implements OnDestroy {
  @Input() graphNodeRef: ElementRef;
  @Input() color: string;
  @Input() contrastMode: boolean;
  @Input() cursorType: string;
  @Input() forceSvg: boolean;
  @Input() highlighted: boolean;
  @Input() id: string;
  @Input() label: string;
  @Input() labelMinor: string;
  @Input() labelOffset: number;
  @Input() networks;
  @Input() matches;
  @Input() metricColor: string;
  @Input() metricFormattedValue: string;
  @Input() metricNumericValue: number;
  @Input() searchTerms: string[];
  @Input() shape: 'circle' | 'cloud' | 'cylinder' | 'dottedcylinde' | 'ShapeDottedTriangle' | 'heptagon' | 'hexagon' | 'octago' | 'pentagon' | 'sheet' | 'square' | 'triangle';
  @Input() size: number;
  @Input() stacked: boolean;
  @Input() tag: 'camera' | 'none';

  private destroySubject$: Subject<void> = new Subject();
  private state;
  private showingNetworks;

  getNetworkColor = getNetworkColor;

  moreFieldMatches;
  moreFieldMatchesTitle;
  matchesToShow;

  constructor(private State: StateService,
              private NodeDetailsUtils: NodeDetailsUtilsService) {
    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.state = state;
      this.showingNetworks = this.state.get('showingNetworks');
    });

    if (this.matches) {
      const matchedMetadata = this.matches.get('metadata', makeList());
      const matchedParents = this.matches.get('parents', makeList());
      const matchedDetails = matchedMetadata.concat(matchedParents);

      if (matchedDetails.size > 2) {
        this.moreFieldMatches = matchedDetails
          .valueSeq()
          .skip(2)
          .map(field => field.label);
        this.moreFieldMatchesTitle = `More matches:\n${this.moreFieldMatches.join(',\n')}`;
      }

      this.matchesToShow = matchedDetails.keySeq().take(2);
    }

  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  handleMouseEnter() {
    this.state = this.state.set('mouseOverNodeId', this.id);
    this.State.setState(this.state);
  }

  handleMouseLeave() {
    this.state = this.state.set('mouseOverNodeId', null);
    this.State.setState(this.state);
  }

  handleClick(ev) {
    ev.stopPropagation();

    const prevSelectedNodeId = this.state.get('selectedNodeId');
    const prevDetailsStackSize = this.state.get('nodeDetails').size;

    // click on sibling closes all
    this.state = this.NodeDetailsUtils.closeAllNodeDetails(this.state);

    // select new node if it's not the same (in that case just delesect)
    if (prevDetailsStackSize > 1 || prevSelectedNodeId !== this.id) {
      // dont set origin if a node was already selected, suppresses animation
      const origin = prevSelectedNodeId === null ? this.graphNodeRef.nativeElement.getBoundingClientRect() : null;
      this.state = this.state.setIn(
        ['nodeDetails', this.id],
        {
          id: this.id,
          label: this.label,
          origin,
          topologyId: this.state.get('currentTopologyId'),
        }
      );
      this.state = this.state.set('selectedNodeId', this.id);
    }

    this.State.setState(this.state);
  }
}
