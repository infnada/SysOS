import {Component, OnInit} from '@angular/core';

import {combineLatest, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AnyOpsOSLibDiagramStateService} from '../../services/anyopsos-lib-diagram-state.service';
import {AnyOpsOSLibDiagramService} from '../../services/anyopsos-lib-diagram.service';
import {Topology} from '../../types/topology';
import {AnyOpsOSLibDiagramTopologyUtilsService} from '../../services/anyopsos-lib-diagram-topology-utils.service';

@Component({
  selector: 'aldiagram-topologies',
  templateUrl: './topologies.component.html',
  styleUrls: ['./topologies.component.scss']
})
export class TopologiesComponent implements OnInit {
  private destroySubject$: Subject<void> = new Subject();

  topologies$:  Observable<Topology[]>;
  currentTopology: Topology;
  searchMatchesCount: number = 0;

  constructor(private readonly LibDiagram: AnyOpsOSLibDiagramService,
              private readonly LibDiagramState: AnyOpsOSLibDiagramStateService,
              private readonly LibDiagramTopologyUtils: AnyOpsOSLibDiagramTopologyUtilsService) {

  }

  async ngOnInit(): Promise<void> {
    this.topologies$ = this.LibDiagramState.topologies;

    // Listen for state changes and update searchMatchesCount & searchHint
    combineLatest(
      this.LibDiagramState.nodes,
      this.LibDiagramState.searchQuery
    ).pipe(takeUntil(this.destroySubject$)).subscribe(([nodes]) => {
      const searchMatches = this.LibDiagram.searchNodeMatches();

      this.searchMatchesCount = searchMatches.length;
    });

    // Listen for currentTopology change
    this.LibDiagramState.currentTopology
      .pipe(takeUntil(this.destroySubject$)).subscribe((currentTopology: Topology) => this.currentTopology = currentTopology);
  }

  basicTopologyInfo(topology, searchMatchCount) {
    const info = [
      `Nodes: ${topology.stats.node_count}`,
      `Connections: ${topology.stats.dge_count}`
    ];
    if (searchMatchCount) {
      info.push(`Search Matches: ${searchMatchCount}`);
    }
    return info.join('\n');
  }

  onTopologyClick(ev: MouseEvent, topology: Topology): void {
    ev.preventDefault();

    const topologyId: string = topology.id;
    const currentTopologyId: string = this.LibDiagramState.$currentTopologyId.getValue();


    if (topologyId !== currentTopologyId) {
      this.LibDiagramTopologyUtils.setTopology(topologyId);
      this.LibDiagramState.setSelectedNodeUuid(null)
    }

  }

}
