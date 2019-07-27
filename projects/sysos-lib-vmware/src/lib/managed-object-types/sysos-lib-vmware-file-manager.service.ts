import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {HostNasVolumeSpec} from '../types/host-nas-volume-spec';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareFileManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  ChangeOwner() {

  }

  CopyDatastoreFile_Task(
    connectionData: ConnectionData,
    srcDatastoreName: string,
    srcPath: string,
    srcDatacenter: ManagedObjectReference & { type: 'Datacenter' },
    dstDatastoreName: string,
    dstPath: string,
    dstDatacenter: ManagedObjectReference & { type: 'Datacenter' },
    force: boolean = false,
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <CopyDatastoreFile_Task xmlns='urn:vim25'>
      <_this type='FileManager'>FileManager</_this>
      <sourceName>[${srcDatastoreName}] ${srcPath}</sourceName>
      <sourceDatacenter type='Datacenter'>${srcDatacenter.value}</sourceDatacenter>
      <destinationName>[${dstDatastoreName}] ${dstPath}</destinationName>
      <destinationDatacenter type='Datacenter'>${dstDatacenter.value}</destinationDatacenter>
      <force>${force}</force>
    </CopyDatastoreFile_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.CopyDatastoreFile_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.CopyDatastoreFile_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  DeleteDatastoreFile_Task(
    connectionData: ConnectionData,
    datastoreName: string,
    path: string,
    managedDatacenter: ManagedObjectReference & { type: 'Datacenter' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <DeleteDatastoreFile_Task xmlns='urn:vim25'>
      <_this type='FileManager'>FileManager</_this>
      <name>[${datastoreName}] ${path}</name>
      <datacenter type='Datacenter'>${managedDatacenter.value}</datacenter>
    </DeleteDatastoreFile_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.DeleteDatastoreFile_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.DeleteDatastoreFile_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  MakeDirectory(
    connectionData: ConnectionData,
    datastoreName: string,
    path: string,
    managedDatacenter: ManagedObjectReference & { type: 'Datacenter' },
    createParentDirectories: boolean = false
  ) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <MakeDirectory xmlns='urn:vim25'>
      <_this type='FileManager'>FileManager</_this>
      <name>[${datastoreName}] ${path}</name>
      <datacenter type='Datacenter'>${managedDatacenter.value}</datacenter>
      <createParentDirectories>${createParentDirectories}</createParentDirectories>
    </MakeDirectory>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.MakeDirectoryResponse[0]);
    })).toPromise();
  }

  MoveDatastoreFile_Task(
    connectionData: ConnectionData,
    srcDatastoreName: string,
    srcPath: string,
    srcDatacenter: ManagedObjectReference & { type: 'Datacenter' },
    dstDatastoreName: string,
    dstPath: string,
    dstDatacenter: ManagedObjectReference & { type: 'Datacenter' },
    force: boolean = false,
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <MoveDatastoreFile_Task xmlns='urn:vim25'>
      <_this type='FileManager'>FileManager</_this>
      <sourceName>[${srcDatastoreName}] ${srcPath}</sourceName>
      <sourceDatacenter type='Datacenter'>${srcDatacenter}</sourceDatacenter>
      <destinationName>[${dstDatastoreName}] ${dstPath}</destinationName>
      <destinationDatacenter type='Datacenter'>${dstDatacenter}</destinationDatacenter>
      <force>${force}</force>
    </MoveDatastoreFile_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.MoveDatastoreFile_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.MoveDatastoreFile_TaskResponse[0].returnval[0];
    })).toPromise();
  }
}
