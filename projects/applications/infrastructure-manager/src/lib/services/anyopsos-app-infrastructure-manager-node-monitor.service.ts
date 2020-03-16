import {Injectable} from '@angular/core';

import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerNodeMonitorService {

  constructor() {
  }

  haveMonitor(object: DataObject): boolean {
    return object.type === 'VirtualMachine' || object.type === 'Pod';
  }
}
