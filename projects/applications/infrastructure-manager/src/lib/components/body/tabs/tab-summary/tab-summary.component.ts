import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {MatChipInputEvent} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

import {AnyOpsOSAppInfrastructureManagerService} from '../../../../services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerNodeGraphService} from '../../../../services/anyopsos-app-infrastructure-manager-node-graph.service';

export interface Tag {
  name: string;
  category: string;
}

@Component({
  selector: 'aaim-tab-summary',
  templateUrl: './tab-summary.component.html',
  styleUrls: ['./tab-summary.component.scss']
})
export class TabSummaryComponent implements OnInit {
  @ViewChild('scrollToElement', {static: false}) scrollToElement: ElementRef<HTMLInputElement>;
  @Input() readonly nmObject: DataObject;

  private currentGraphTopology: string = null;

  tags: Tag[] = [
    {name: 'tag', category: 'category'},
    {name: 'tag', category: 'category'},
    {name: 'tag', category: 'category'},
  ];

  nodes$: Promise<any>;
  topologies$: Promise<any>;

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly Utils: AnyOpsOSLibUtilsService,
              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private readonly InfrastructureManagerNodeGraph: AnyOpsOSAppInfrastructureManagerNodeGraphService) {
  }

  ngOnInit(): void {

    this.nodes$ = this.InfrastructureManagerNodeGraph.setNodeGraphNodes(this.currentGraphTopology, this.nmObject).catch((e: Error) => {
      this.logger.error('InfrastructureManager', 'Error while getting graph nodes', null, e);
    });

    this.topologies$ = this.InfrastructureManagerNodeGraph.getTopologies().catch((e: Error) => {
      this.logger.error('InfrastructureManager', 'Error while getting graph topologies', null, e);
    });
  }

  // Tags
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push({name: value.trim(), category: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  /**
   * NodeGraph
   */
  scrollTo(): void {
    this.Utils.angularElementScrollTo(this.scrollToElement.nativeElement.parentElement.parentElement, true);
  }

  selectedTopologyChange($event) {
    this.currentGraphTopology = $event;
  }

  selectedNodeChange($event) {
    return this.InfrastructureManagerNodeGraph.selectedNodeChange($event);
  }
}
