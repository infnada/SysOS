import {Component, AfterViewInit, ViewEncapsulation} from '@angular/core';

import {AnyOpsOSExtLibMxgraphService} from '@anyopsos/ext-lib-mxgraph';
import {AnyOpsOSExtLibPakoService} from '@anyopsos/ext-lib-pako';
import {AnyOpsOSExtLibSpinJsService} from '@anyopsos/ext-lib-spin-js';

declare var Load: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'aadrw-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements AfterViewInit {

  private mx;
  private pako;
  private spinjs;

  constructor(private MxgraphService: AnyOpsOSExtLibMxgraphService,
              private PakoService: AnyOpsOSExtLibPakoService,
              private SpinService: AnyOpsOSExtLibSpinJsService) {
    this.mx = this.MxgraphService.mx;
    this.pako = this.PakoService.Pako;
    this.spinjs = this.SpinService.Spinner;
  }

  ngAfterViewInit() {
    return new Load(this.mx, this.pako, this.spinjs);
  }
}
