import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {MatChipInputEvent} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';

import {AnyOpsOSAppInfrastructureManagerService} from '../../../services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerNodeGraphService} from '../../../services/anyopsos-app-infrastructure-manager-node-graph.service';
import {ImDataObject} from '../../../types/im-data-object';

export interface Tag {
  name: string;
  category: string;
}

@Component({
  selector: 'saim-tab-summary',
  templateUrl: './tab-summary.component.html',
  styleUrls: ['./tab-summary.component.scss']
})
export class TabSummaryComponent implements OnInit {
  @ViewChild('scrollToElement') scrollToElement: ElementRef<HTMLInputElement>;

  @Input() nmObject: ImDataObject;

  tags: Tag[] = [
    {name: 'tag', category: 'category'},
    {name: 'tag', category: 'category'},
    {name: 'tag', category: 'category'},
  ];

  constructor(private Utils: AnyOpsOSLibUtilsService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerNodeGraph: AnyOpsOSAppInfrastructureManagerNodeGraphService) {
  }

  ngOnInit() {
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
   * Weavescope graph
   */
  scrollTo(): void {
    console.log(this.scrollToElement);
    console.log(this.scrollToElement.nativeElement.parentElement.parentElement);
    this.Utils.angularElementScrollTo(this.scrollToElement.nativeElement.parentElement.parentElement, true);
  }

  setNodeGraphNodes() {
    return this.InfrastructureManagerNodeGraph.setNodeGraphNodes();
  }

  selectedNodeChange($event) {
    return this.InfrastructureManagerNodeGraph.selectedNodeChange($event);
  }
}
