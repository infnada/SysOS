import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareOvfManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  CreateDescriptor() {

  }

  CreateImportSpec() {

  }

  ParseDescriptor() {

  }

  ValidateHost() {

  }
}
