import {Component, Input, OnInit} from '@angular/core';

import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

@Component({
  selector: 'aaim-tab-configure',
  templateUrl: './tab-configure.component.html',
  styleUrls: ['./tab-configure.component.scss']
})
export class TabConfigureComponent implements OnInit {
  @Input() nmObject: DataObject;

  constructor() {
  }

  ngOnInit(): void {
  }

}
