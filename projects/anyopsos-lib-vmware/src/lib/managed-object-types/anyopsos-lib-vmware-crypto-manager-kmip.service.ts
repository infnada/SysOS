import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareCryptoManagerKmipService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
