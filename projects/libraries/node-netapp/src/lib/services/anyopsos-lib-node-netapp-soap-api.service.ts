import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AnyOpsOSLibWorkspaceService} from '@anyopsos/lib-workspace';
import {NetappSdkFunctions, NetappSdkVfilerFunctions, NetappSdkFunctionsInput, NetappSdkVfilerFunctionsInput, NetappSdkFunctionsOutput, NetappSdkVfilerFunctionsOutput} from '@anyopsos/sdk-netapp';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeNetappSoapApiService {

  constructor(private readonly http: HttpClient,
              private readonly LibWorkspace: AnyOpsOSLibWorkspaceService) {
  }

  // netapp-manageability-sdk-ontap-9.3-api-documentation/doc/WebHelp/index.htm
  // async callSoapApi<Action extends NetappSdkFunctions>(connectionUuid: string, action: Action, data: NetappSdkFunctionsInput<Action>): Promise<NetappSdkFunctionsOutput<Action>>
  // async callSoapApi<Action extends NetappSdkVfilerFunctions>(connectionUuid: string, action: Action, data: NetappSdkVfilerFunctionsInput<Action>, vfiler: string): Promise<NetappSdkVfilerFunctionsOutput<Action>>
  async callSoapApi<Action extends NetappSdkFunctions | NetappSdkVfilerFunctions>(
    connectionUuid: string,
    action: Action,
    data: NetappSdkFunctionsInput<Action> | NetappSdkVfilerFunctionsInput<Action>,
    vfiler?: string
  ): Promise<NetappSdkFunctionsOutput<Action> | NetappSdkVfilerFunctionsOutput<Action>> {
    return this.http.post(`/api/netapp/soap/${this.LibWorkspace.getCurrentWorkspaceUuid()}/${connectionUuid}${vfiler ? '/' + vfiler : ''}`, {action, data}).toPromise().then(async (apiResult: any) => {

      if (apiResult.data['next-tag']) {
        data['next-tag'] = apiResult.data['next-tag'][0].replace(/</g, '&lt;').replace(/>/g, '&gt;');

        apiResult.data['attributes-list'] = [
          ...apiResult.data['attributes-list'],
          ...await (vfiler ? this.callSoapApi(connectionUuid, action, data, vfiler).then(data => data['attributes-list']) : this.callSoapApi(connectionUuid, action, data).then(data => data['attributes-list']))];

        // Since we are already getting all the results, delete next-tag value property
        delete apiResult.data['next-tag'];
      }

      return apiResult;
    });
  }

}
