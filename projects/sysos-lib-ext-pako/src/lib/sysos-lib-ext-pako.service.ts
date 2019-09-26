import {Injectable} from '@angular/core';

import * as Pako from 'pako';

@Injectable({
  providedIn: 'root'
})
export class SysosLibExtPakoService {

  public Pako;

  constructor() {
    this.Pako = Pako;
  }
}
