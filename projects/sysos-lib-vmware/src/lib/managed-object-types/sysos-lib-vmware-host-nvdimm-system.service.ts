import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostNvdimmSystemService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }
  CreateNvdimmNamespace_Task() {

  }

  DeleteNvdimmBlockNamespaces_Task() {

  }

  DeleteNvdimmNamespace_Task() {

  }
}
