import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareAuthorizationManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AddAuthorizationRole() {

  }

  FetchUserPrivilegeOnEntities() {

  }

  HasPrivilegeOnEntities() {

  }

  HasPrivilegeOnEntity() {

  }

  HasUserPrivilegeOnEntities() {

  }

  MergePermissions() {

  }

  RemoveAuthorizationRole() {

  }

  RemoveEntityPermission() {

  }

  ResetEntityPermissions() {

  }

  RetrieveAllPermissions() {

  }

  RetrieveEntityPermissions() {

  }

  RetrieveRolePermissions() {

  }

  SetEntityPermissions() {

  }

  UpdateAuthorizationRole() {

  }
}
