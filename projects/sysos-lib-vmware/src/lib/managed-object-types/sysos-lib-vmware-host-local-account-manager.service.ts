import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostLocalAccountManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AssignUserToGroup() {

  }

  CreateGroup() {

  }

  CreateUser() {

  }

  RemoveGroup() {

  }

  RemoveUser() {

  }

  UnassignUserFromGroup() {

  }

  UpdateUser() {

  }
}
