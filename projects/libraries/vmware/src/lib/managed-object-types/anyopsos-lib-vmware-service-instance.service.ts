import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareServiceInstanceService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  CurrentTime() {

  }

  QueryVMotionCompatibility() {

  }

  RetrieveProductComponents() {

  }

  RetrieveServiceContent() {

  }

  ValidateMigration() {

  }
}
