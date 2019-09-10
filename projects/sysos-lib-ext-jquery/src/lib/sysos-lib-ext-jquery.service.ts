import {Injectable} from '@angular/core';

import * as $ from 'jquery';
export default $;

@Injectable({
  providedIn: 'root'
})
export class SysosLibExtJqueryService {

  public $: $;

  constructor() {
    this.$ = $.default;
  }
}
