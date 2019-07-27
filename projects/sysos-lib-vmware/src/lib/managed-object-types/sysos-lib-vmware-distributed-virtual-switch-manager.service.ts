import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareDistributedVirtualSwitchManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
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
