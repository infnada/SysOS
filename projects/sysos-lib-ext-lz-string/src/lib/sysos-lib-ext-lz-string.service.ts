import {Injectable} from '@angular/core';

import * as LZString from 'lz-string';

@Injectable({
  providedIn: 'root'
})
export class SysosLibExtLzStringService {

  public LZString;

  constructor() {
    this.LZString = (LZString as any).default;
  }
}
