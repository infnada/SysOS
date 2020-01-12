import {Component, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {StateService} from '../../../services/state.service';

@Component({
  selector: 'aelweaves-nodes-chart',
  templateUrl: './nodes-chart.component.html',
  styleUrls: ['./nodes-chart.component.scss']
})
export class NodesChartComponent implements OnDestroy {
  private destroySubject$: Subject<void> = new Subject();

  selectedNodeId: string;

  constructor(private State: StateService) {
    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.selectedNodeId = state.get('selectedNodeId');
    });
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

}
