import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {Observable} from 'rxjs';

import {isEqual} from 'lodash-es';

import {AnyOpsOSLibDiagramStateService} from '../services/anyopsos-lib-diagram-state.service';
import {AnyOpsOSLibDiagramInitializerService} from '../services/anyopsos-lib-diagram-initializer.service';
import {Node} from '../types/node';
import {filter, flatMap, isEmpty} from 'rxjs/operators';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'aldiagram-anyopsos-lib-diagram[graphNodes][graphTopologies]',
  templateUrl: './anyopsos-lib-diagram.component.html',
  styleUrls: ['./anyopsos-lib-diagram.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnyOpsOSLibDiagramComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('diagramApp', {static: false}) private readonly diagramApp: ElementRef;
  @Input() private readonly graphNodes: Node[];
  @Input() private readonly graphTopologies;
  @Input() readonly simpleLayout: boolean = false;
  @Output() selectedNode = new EventEmitter<{}>();
  @Output() selectedTopology = new EventEmitter<{}>();

  nodesLoaded$: Observable<boolean>;
  topologiesLoaded$: Observable<boolean>;
  isNodesDisplayEmpty$: Observable<boolean>;

  constructor(private readonly LibDiagramState: AnyOpsOSLibDiagramStateService,
              private readonly LibDiagramInitializer: AnyOpsOSLibDiagramInitializerService) {
  }

  ngOnInit(): void {

    // Listen for nodesLoaded change
    this.nodesLoaded$ = this.LibDiagramState.nodesLoaded;

    // Listen for topologiesLoaded change
    this.topologiesLoaded$ = this.LibDiagramState.topologiesLoaded;

    // Listen for non filtered nodes change
    this.isNodesDisplayEmpty$ = this.LibDiagramState.nodes.pipe(
      flatMap(nodes => nodes),
      filter(nodes => !nodes.filtered),
      isEmpty()
    );

  }

  ngOnChanges(nextProps: SimpleChanges): void {
    console.log(nextProps);

    // firstChange data === null
    if (nextProps.graphNodes && nextProps.graphNodes.firstChange) return;

    if ((nextProps.graphNodes && nextProps.graphNodes.currentValue) || (nextProps.graphTopologies && nextProps.graphTopologies.currentValue)) {

      const nodesLoaded: boolean = this.LibDiagramState.$nodesLoaded.getValue();
      const topologiesLoaded: boolean = this.LibDiagramState.$topologiesLoaded.getValue();

      if (!nodesLoaded && !topologiesLoaded) {

        // Set topology & nodes
        this.LibDiagramInitializer.init(nextProps.graphNodes.currentValue, nextProps.graphTopologies.currentValue);
      } else {

        //if (!nextProps.graphNodes || (nextProps.graphNodes && isEqual(nextProps.graphNodes.previousValue, nextProps.graphNodes.currentValue))) return;
        this.LibDiagramState.setNodes(nextProps.graphNodes.currentValue);
        this.LibDiagramState.setForceRelayout(true);

        this.LibDiagramInitializer.updateStateFromNodes();
      }

    }
  }

  ngAfterViewInit(): void {
    const { width, height } = this.diagramApp.nativeElement.getBoundingClientRect();

    this.LibDiagramState.setViewport({
      height,
      width,
    });
  }

}
