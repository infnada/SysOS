import {Injectable} from '@angular/core';

import * as gaugeJS from 'gaugeJS/dist/gauge.js';

export default gaugeJS;

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSExtLibGaugejsService {

  public gaugeJS: gaugeJS;

  constructor() {
    this.gaugeJS = gaugeJS.default;
  }
}
