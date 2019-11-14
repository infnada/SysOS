import {Injectable} from '@angular/core';

import * as PerfectScrollbar from 'perfect-scrollbar';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibExtPerfectscrollbarService {

  public PerfectScrollbar;

  constructor() {
    this.PerfectScrollbar = (PerfectScrollbar as any).default;
  }
}
