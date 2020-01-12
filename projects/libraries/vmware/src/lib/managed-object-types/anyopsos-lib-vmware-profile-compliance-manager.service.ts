import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareProfileComplianceManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  CheckCompliance_Task() {

  }

  ClearComplianceStatus() {

  }

  QueryComplianceStatus() {

  }

  QueryExpressionMetadata() {

  }
}
