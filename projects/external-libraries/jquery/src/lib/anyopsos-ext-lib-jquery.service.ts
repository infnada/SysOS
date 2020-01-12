import {Injectable} from '@angular/core';

import * as $ from 'jquery';
export default $;

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSExtLibJqueryService {

  public $: $;

  constructor() {
    this.$ = $.default;
  }
}
