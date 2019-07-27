import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareFailoverClusterConfiguratorService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
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
