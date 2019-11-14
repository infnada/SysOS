import {Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {StateService} from '../../services/state.service';
import {SelectorsService} from '../../services/selectors.service';

@Component({
  selector: 'slews-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {
  private destroySubject$: Subject<void> = new Subject();
  private state;

  availableMetrics;
  pinnedMetricType;
  selectedMetricType;

  constructor(private State: StateService,
              private Selectors: SelectorsService) {
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);

    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.state = state;
      this.availableMetrics = this.Selectors.availableMetricsSelector(state);
      this.pinnedMetricType = this.state.get('pinnedMetricType');
      this.selectedMetricType = this.Selectors.selectedMetricTypeSelector(state);
    });
  }

  ngOnInit() {
  }

  onMouseOut() {
    this.state = this.state.set('hoveredMetricType', null);
    this.State.setState(this.state);
  }

  onMouseOver(metric) {
    const metricType = metric.get('label');
    this.state = this.state.set('hoveredMetricType', metricType);

    this.State.setState(this.state);
  }

  onMouseClick(metric) {
    const metricType = metric.get('label');

    if (metricType !== this.pinnedMetricType) {
      this.state = this.state.set('pinnedMetricType', metricType);
    } else {
      this.state = this.state.set('pinnedMetricType', null);
    }

    this.State.setState(this.state);
  }

}
