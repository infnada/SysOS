import {Component, Input, OnInit} from '@angular/core';

import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

@Component({
  selector: 'aaim-tab-updates',
  templateUrl: './tab-updates.component.html',
  styleUrls: ['./tab-updates.component.scss']
})
export class TabUpdatesComponent implements OnInit {
  @Input() nmObject: DataObject;

  constructor() {
  }

  ngOnInit(): void {
  }

}
