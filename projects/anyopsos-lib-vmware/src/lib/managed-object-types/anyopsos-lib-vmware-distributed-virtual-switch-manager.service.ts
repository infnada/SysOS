import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareDistributedVirtualSwitchManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  DVSManagerExportEntity_Task() {

  }

  DVSManagerImportEntity_Task() {

  }

  DVSManagerLookupDvPortGroup() {

  }

  QueryAvailableDvsSpec() {

  }

  QueryCompatibleHostForExistingDvs() {

  }

  QueryCompatibleHostForNewDvs() {

  }

  QueryDvsByUuid() {

  }

  QueryDvsCheckCompatibility() {

  }

  QueryDvsCompatibleHostSpec() {

  }

  QueryDvsConfigTarget() {

  }

  QueryDvsFeatureCapability() {

  }

  RectifyDvsOnHost_Task() {

  }
}
