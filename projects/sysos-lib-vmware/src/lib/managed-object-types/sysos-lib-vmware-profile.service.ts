import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareProfileService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AssociateProfile() {

  }

  CheckProfileCompliance_Task() {

  }

  DestroyProfile() {

  }

  DissociateProfile() {

  }

  ExportProfile() {

  }

  RetrieveDescription() {

  }
}
