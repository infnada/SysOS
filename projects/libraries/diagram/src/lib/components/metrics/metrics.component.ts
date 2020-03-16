import {Component, OnInit} from '@angular/core';

import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibDiagramService} from '../../services/anyopsos-lib-diagram.service';
import {AnyOpsOSLibDiagramStateService} from '../../services/anyopsos-lib-diagram-state.service';

@Component({
  selector: 'aldiagram-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
  private destroySubject$: Subject<void> = new Subject();

  availableMetrics: {id: string; label: string;}[];
  pinnedMetricType: string;
  selectedMetricType: string;

  constructor(private readonly LibDiagram: AnyOpsOSLibDiagramService,
              private readonly LibDiagramState: AnyOpsOSLibDiagramStateService) {

  }

  ngOnInit(): void {

    // Listen for pinnedMetricType change
    this.LibDiagramState.pinnedMetricType
      .pipe(takeUntil(this.destroySubject$)).subscribe((pinnedMetricType: string) => this.pinnedMetricType = pinnedMetricType);

    // Listen for nodes change and set availableMetrics
    this.LibDiagramState.nodes
      .pipe(takeUntil(this.destroySubject$)).subscribe(() =>  this.availableMetrics = this.LibDiagram.availableMetrics());

    // Listen for state changes and update selectedMetricType
    combineLatest(
      this.LibDiagramState.pinnedMetricType,
      this.LibDiagramState.hoveredMetricType
    ).pipe(takeUntil(this.destroySubject$)).subscribe(() => {
      this.selectedMetricType = this.LibDiagram.selectedMetricType();
    });
  }

  onMouseOut() {
    this.LibDiagramState.setHoveredMetricType(null);
  }

  onMouseOver(metric) {
    this.LibDiagramState.setHoveredMetricType(metric.label);
  }

  onMouseClick(metric) {

    if (metric.label !== this.pinnedMetricType) {
      this.LibDiagramState.setPinnedMetricType(metric.label);
    } else {
      this.LibDiagramState.setPinnedMetricType(null);
    }

  }

}
