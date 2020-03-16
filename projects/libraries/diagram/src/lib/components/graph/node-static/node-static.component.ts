import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {AnyOpsOSLibDiagramStateService} from '../../../services/anyopsos-lib-diagram-state.service';
import {LayoutNode} from '../../../types/layout-node';

@Component({
  selector: '[aldiagram-node-static]',
  templateUrl: './node-static.component.html',
  styleUrls: ['./node-static.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeStaticComponent implements OnInit {
  @Input() nodeElement: LayoutNode;
  @Input() graphNodeRef: ElementRef;

  @Input() labelOffset: number = 0;
  @Input() color: string = 'hsl(240, 20%, 60%)';
  @Input() contrastMode: boolean = false;
  @Input() forceSvg: boolean = false;
  @Input() searchTerms: string[] = [];
  @Input() metricColor: string = 'hsl(46, 69%, 49%)';
  @Input() metricFormattedValue: string = '';
  @Input() metricNumericValue: number = NaN;

  @Input() cursorType: string = 'pointer';
  @Input() tag: 'camera' | 'none' = 'none';

  private destroySubject$: Subject<void> = new Subject();

  private showingNetworks: boolean;

  matchesToShow: { label: string; text: string; }[];
  moreFieldMatches: string[];
  moreFieldMatchesTitle: string;

  constructor(private readonly LibDiagramState: AnyOpsOSLibDiagramStateService) {
  }

  ngOnInit(): void {

    // Listen for showingNetworks change
    this.LibDiagramState.showingNetworks
      .pipe(takeUntil(this.destroySubject$)).subscribe((showingNetworks: boolean) => this.showingNetworks = showingNetworks);

    if (this.nodeElement.matches) {

      const matchedDetails: { label: string; text: string; }[] = this.nodeElement.matches.filter((m) => {
        return m.keyPath.includes('metadata') || m.keyPath.includes('parents');
      }).map(m => ({label: m.label, text: m.text}));

      if (matchedDetails.length > 2) {

        this.moreFieldMatches = matchedDetails
          .filter((m, i) => i > 1)
          .map((field) => field.label);
        this.moreFieldMatchesTitle = `More matches:\n${this.moreFieldMatches.join(',\n')}`;
      }

      this.matchesToShow = matchedDetails.filter((m, i) => i < 2)
    }
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  async handleMouseEnter(): Promise<void> {
    this.LibDiagramState.setMouseOverNodeId(this.nodeElement.id);
  }

  handleMouseLeave(): void {
    this.LibDiagramState.setMouseOverNodeId(null);
  }

  async handleClick(ev): Promise<void> {
    ev.stopPropagation();

    this.LibDiagramState.setSelectedNodeUuid(this.nodeElement.id);
  }

}
