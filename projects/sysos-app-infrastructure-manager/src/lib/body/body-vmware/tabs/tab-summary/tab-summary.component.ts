import {Component, Input, OnInit} from '@angular/core';

import {MatChipInputEvent} from '@sysos/lib-angular-material';

import {SysosAppInfrastructureVmwareTemplateHelpersService} from '../../../../services/vmware/sysos-app-infrastructure-vmware-template-helpers.service';
import {SysosAppInfrastructureManagerService} from "../../../../services/sysos-app-infrastructure-manager.service";
import {VMWareObject} from '../../../../types/vmware-object';

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
  @Input() vmwareObject: VMWareObject;

  tags: Tag[] = [
    {name: 'tag', category: 'category'},
    {name: 'tag', category: 'category'},
    {name: 'tag', category: 'category'},
  ];

  constructor(public VmwareTemplateHelpers: SysosAppInfrastructureVmwareTemplateHelpersService,
              private InfrastructureManager: SysosAppInfrastructureManagerService) {
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

  setWeaveScopeNodes() {
    return this.InfrastructureManager.setWeaveScopeNodes();
  }

  selectedNodeChange($event) {
    return this.InfrastructureManager.selectedNodeChange($event);
  }
}
