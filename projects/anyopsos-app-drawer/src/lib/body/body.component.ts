import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';

import {AnyOpsOSLibExtMxgraphService} from '@anyopsos/lib-ext-mxgraph';

declare var Load: any;

import * as Sanitizer from 'draw.io/drawio/src/main/webapp/js/sanitizer/sanitizer.min';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'sadrw-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements AfterViewInit {

  private mx;

  private Sanitizer = Sanitizer;

  constructor(private MxgraphService: AnyOpsOSLibExtMxgraphService) {
    this.mx = this.MxgraphService.mx;
  }

  ngAfterViewInit() {
    return new Load(this.mx);
  }
}
