import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareCertificateManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  CertMgrRefreshCACertificatesAndCRLs_Task() {

  }

  CertMgrRefreshCertificates_Task() {

  }

  CertMgrRevokeCertificates_Task() {

  }
}
