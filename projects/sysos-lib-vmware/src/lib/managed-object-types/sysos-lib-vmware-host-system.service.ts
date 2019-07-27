import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostSystemService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AcquireCimServicesTicket() {

  }

  ConfigureCryptoKey() {

  }

  DisconnectHost_Task() {

  }

  EnableCrypto() {

  }

  EnterLockdownMode() {

  }

  EnterMaintenanceMode_Task() {

  }

  ExitLockdownMode() {

  }

  ExitMaintenanceMode_Task() {

  }

  PowerDownHostToStandBy_Task() {

  }

  PowerUpHostFromStandBy_Task() {

  }

  PrepareCrypto() {

  }

  QueryHostConnectionInfo() {

  }

  QueryMemoryOverhead() {

  }

  QueryMemoryOverheadEx() {

  }

  QueryTpmAttestationReport() {

  }

  RebootHost_Task() {

  }

  ReconfigureHostForDAS_Task() {

  }

  ReconnectHost_Task() {

  }

  RetrieveHardwareUptime() {

  }

  ShutdownHost_Task() {

  }

  UpdateFlags() {

  }

  UpdateIpmi() {

  }

  UpdateSystemResources() {

  }

  UpdateSystemSwapConfiguration() {

  }
}
