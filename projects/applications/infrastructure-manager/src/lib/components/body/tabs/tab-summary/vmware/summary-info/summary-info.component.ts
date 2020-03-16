import {Component, Input, OnInit} from '@angular/core';

import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

import {AnyOpsOSLibNodeTemplateHelpersService} from '@anyopsos/lib-node';

@Component({
  selector: 'aaim-summary-info',
  templateUrl: './summary-info.component.html',
  styleUrls: ['./summary-info.component.scss']
})
export class SummaryInfoComponent implements OnInit {
  @Input() vmwareObject: DataObject;

  constructor(public readonly LibNodeTemplateHelpers: AnyOpsOSLibNodeTemplateHelpersService) { }

  ngOnInit(): void {
  }

}
