import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";
import {connectionData} from "../types/connection-data";
import {ManagedObjectReference} from "../types/managed-object-reference";
import {HostDatastoreBrowserSearchSpec} from "../types/host-datastore-browser-search-spec";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostDatastoreBrowserService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  DeleteFile() {

  }

  SearchDatastore_Task(
    connectionData: connectionData,
    managedDatastoreBrowser: ManagedObjectReference & { type: 'HostDatastoreBrowser' },
    datastoreName: string,
    path: string,
    searchSpec?: HostDatastoreBrowserSearchSpec,
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <soap:Body>
    <SearchDatastore_Task xmlns="urn:vim25">
      <_this type="HostDatastoreBrowser">${managedDatastoreBrowser.value}</_this>
      <datastorePath>[${datastoreName}] ${path}</datastorePath>
      <searchSpec>${this.SysosLibVmwareHelper.setDynamicProperties(searchSpec)}</searchSpec>
    </SearchDatastore_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.SearchDatastore_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.SearchDatastore_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  SearchDatastoreSubFolders_Task() {

  }
}
