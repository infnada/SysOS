import {Injectable} from '@angular/core';

import * as mxClient from 'mxgraph/javascript/mxClient.js';
export default mxClient;

import {mxgraph, mx} from './types/mxgraph';

@Injectable({
  providedIn: 'root'
})
export class SysosLibMxgraphService {

  public mx: mxgraph;

  constructor() {
    this.mx = mx;
  }
}
