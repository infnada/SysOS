import {Component, OnInit} from '@angular/core';

import {mxgraph} from '../types/mxgraph';

declare var require: any;
const mx = require('mxgraph')({
  mxImageBasePath: 'assets/mxgraph/images',
  mxBasePath: 'assets/mxgraph'
});

@Component({
  selector: 'sadrw-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const container = document.getElementById('graphContainer');
    const graph = new mx.mxGraph(container);
  }

}
