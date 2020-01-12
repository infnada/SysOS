import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostVflashManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  ConfigureVFlashResourceEx_Task() {

  }

  HostConfigureVFlashResource() {

  }

  HostConfigVFlashCache() {

  }

  HostGetVFlashModuleDefaultConfig() {

  }

  HostRemoveVFlashResource() {

  }
}
