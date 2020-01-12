import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareFailoverClusterConfiguratorService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  configureVcha_Task() {

  }

  createPassiveNode_Task() {

  }

  createWitnessNode_Task() {

  }

  deployVcha_Task() {

  }

  destroyVcha_Task() {

  }

  getVchaConfig() {

  }

  prepareVcha_Task() {

  }
}
