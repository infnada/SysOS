import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareAuthorizationManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
