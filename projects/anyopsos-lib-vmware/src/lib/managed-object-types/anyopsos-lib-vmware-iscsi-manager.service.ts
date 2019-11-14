import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareIscsiManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  BindVnic() {

  }

  QueryBoundVnics() {

  }

  QueryCandidateNics() {

  }

  QueryMigrationDependencies() {

  }

  QueryPnicStatus() {

  }

  QueryVnicStatus() {

  }

  UnbindVnic() {

  }
}
