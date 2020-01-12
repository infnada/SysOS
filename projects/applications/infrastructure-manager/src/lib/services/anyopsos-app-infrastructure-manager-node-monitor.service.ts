import {Injectable} from '@angular/core';

import {ImDataObject} from '../types/im-data-object';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerNodeMonitorService {

  constructor() {
  }

  haveMonitor(object: ImDataObject): boolean {
    return object.type === 'VirtualMachine' || object.type === 'Pod';
  }
}
