import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {HostDatastoreBrowserSearchSpec} from '../types/host-datastore-browser-search-spec';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostDatastoreBrowserService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  DeleteFile() {

  }

  SearchDatastore_Task(
    connectionData: ConnectionData,
    managedDatastoreBrowser: ManagedObjectReference & { $type: 'HostDatastoreBrowser' },
    datastoreName: string,
    path: string,
    searchSpec?: HostDatastoreBrowserSearchSpec,
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<SearchDatastore_Task xmlns='urn:vim25'>
      <_this type='HostDatastoreBrowser'>${managedDatastoreBrowser._value}</_this>
      <datastorePath>[${datastoreName}] ${path}</datastorePath>
      <searchSpec>${this.AnyOpsOSLibVmwareHelper.setDynamicProperties(searchSpec)}</searchSpec>
    </SearchDatastore_Task>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.SearchDatastore_TaskResponse[0].returnval[0]._;
        return this.AnyOpsOSLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.AnyOpsOSLibVmwareHelper.validResponse(res);
        });
      }

      return data.SearchDatastore_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  SearchDatastoreSubFolders_Task() {

  }
}
