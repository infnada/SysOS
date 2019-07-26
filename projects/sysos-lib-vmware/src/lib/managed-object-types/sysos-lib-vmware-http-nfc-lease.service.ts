import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHttpNfcLeaseService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  HttpNfcLeaseAbort() {

  }

  HttpNfcLeaseComplete() {

  }

  HttpNfcLeaseGetManifest() {

  }

  HttpNfcLeaseProgress() {

  }

  HttpNfcLeasePullFromUrls_Task() {

  }

  HttpNfcLeaseSetManifestChecksumType() {

  }
}
