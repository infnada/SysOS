import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostCertificateManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  GenerateCertificateSigningRequest() {

  }

  GenerateCertificateSigningRequestByDn() {

  }

  InstallServerCertificate() {

  }

  ListCACertificateRevocationLists() {

  }

  ListCACertificates() {

  }

  ReplaceCACertificatesAndCRLs() {

  }
}
