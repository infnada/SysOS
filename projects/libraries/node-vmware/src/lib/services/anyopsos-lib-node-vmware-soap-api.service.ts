import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {VmwareSdkFunctions, VmwareSdkFunctionsInput, VmwareSdkFunctionsOutput} from '@anyopsos/sdk-vmware';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeVmwareSoapApiService {

  constructor(private readonly http: HttpClient,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService) {
  }

  // https://code.vmware.com/apis/358/vsphere#
  // https://vdc-repo.vmware.com/vmwb-repository/dcr-public/1cd28284-3b72-4885-9e31-d1c6d9e26686/71ef7304-a6c9-43b3-a3cd-868b2c236c81/doc/index.html
  // https://code.vmware.com/web/sdk/6.7/vsphere-management
  callSoapApi<Action extends VmwareSdkFunctions>(connectionUuid: string, action: Action, data: VmwareSdkFunctionsInput<Action>): Promise<VmwareSdkFunctionsOutput<Action>> {

    // @ts-ignore TODO
    return this.http.post(`/api/vmware/soap/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}`, {action, data}).toPromise() as Promise<VmwareSdkFunctionsOutput<Action>>;
  }

}
