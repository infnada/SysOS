import {Injectable} from '@angular/core';

import {Spinner} from 'spin.js';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSExtLibSpinJsService {

  public Spinner = Spinner;

  constructor() {
  }
}
