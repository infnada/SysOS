import {Injectable} from '@angular/core';

import * as $ from 'jquery';
export default $;

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibExtJqueryService {

  public $: $;

  constructor() {
    this.$ = $.default;
  }
}
