import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostSystemService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
