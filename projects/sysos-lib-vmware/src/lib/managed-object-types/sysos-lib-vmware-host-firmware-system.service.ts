import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostFirmwareSystemService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  BackupFirmwareConfiguration() {

  }

  QueryFirmwareConfigUploadURL() {

  }

  ResetFirmwareToFactoryDefaults() {

  }

  RestoreFirmwareConfiguration() {

  }
}
