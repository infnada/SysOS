import {Injectable} from '@angular/core';

import {mxgraph, mx} from './types/mxgraph';

@Injectable({
  providedIn: 'root'
})
export class SysosLibExtMxgraphService {

  public mx: mxgraph;

  constructor() {
    this.mx = mx;
  }
}
