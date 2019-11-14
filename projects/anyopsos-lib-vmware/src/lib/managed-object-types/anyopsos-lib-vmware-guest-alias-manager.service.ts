import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareGuestAliasManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  AddGuestAlias() {

  }

  ListGuestAliases() {

  }

  ListGuestMappedAliases() {

  }

  RemoveGuestAlias() {

  }

  RemoveGuestAliasByCert() {

  }
}
