import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostActiveDirectoryAuthenticationService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  DisableSmartCardAuthentication() {

  }

  EnableSmartCardAuthentication() {

  }

  ImportCertificateForCAM_Task() {

  }

  InstallSmartCardTrustAnchor() {

  }

  JoinDomain_Task() {

  }

  JoinDomainWithCAM_Task() {

  }

  LeaveCurrentDomain_Task() {

  }

  ListSmartCardTrustAnchors() {

  }

  RemoveSmartCardTrustAnchor() {

  }

  RemoveSmartCardTrustAnchorByFingerprint() {

  }

  ReplaceSmartCardTrustAnchors() {

  }
}
