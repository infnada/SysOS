import {Injectable} from '@angular/core';

import {mxgraph, mx} from './types/mxgraph';

declare let mxgraphWrapper;

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibExtMxgraphService {

  public mx: mxgraph;

  constructor() {
    this.mx = mx;
    this.mx = mxgraphWrapper();
  }
}
