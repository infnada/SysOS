import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareCertificateManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CertMgrRefreshCACertificatesAndCRLs_Task() {

  }

  CertMgrRefreshCertificates_Task() {

  }

  CertMgrRevokeCertificates_Task() {

  }
}
