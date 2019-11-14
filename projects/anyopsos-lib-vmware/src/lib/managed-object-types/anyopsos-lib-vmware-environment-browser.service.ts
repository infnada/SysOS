import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareEnvironmentBrowserService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  QueryConfigOption() {

  }

  QueryConfigOptionDescriptor() {

  }

  QueryConfigOptionEx() {

  }

  QueryConfigTarget() {

  }

  QueryTargetCapabilities() {

  }
}
