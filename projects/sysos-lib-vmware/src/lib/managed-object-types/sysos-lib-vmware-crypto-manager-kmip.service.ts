import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareCryptoManagerKmipService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  GenerateClientCsr() {

  }

  GenerateKey() {

  }

  GenerateSelfSignedClientCert() {

  }

  ListKmipServers() {

  }

  MarkDefault() {

  }

  RegisterKmipServer() {

  }

  RemoveKmipServer() {

  }

  RetrieveClientCert() {

  }

  RetrieveClientCsr() {

  }

  RetrieveKmipServerCert() {

  }

  RetrieveKmipServersStatus_Task() {

  }

  RetrieveSelfSignedClientCert() {

  }

  UpdateKmipServer() {

  }

  UpdateKmsSignedCsrClientCert() {

  }

  UpdateSelfSignedClientCert() {

  }

  UploadClientCert() {

  }

  UploadKmipServerCert() {

  }
}
