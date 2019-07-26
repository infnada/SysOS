import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";
import {connectionData} from "../types/connection-data";
import {ManagedObjectReference} from "../types/managed-object-reference";
import {VirtualMachineCloneSpec} from "../types/virtual-machine-clone-spec";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareVirtualMachineService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AcquireMksTicket() {

  }

  AcquireTicket() {

  }

  AnswerVM(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' },
    questionId: string,
    answerChoice: string
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <AnswerVM xmlns="urn:vim25">
      <_this type="VirtualMachine">${managedObject.value}</_this>
      <questionId>${questionId}</questionId>
      <answerChoice>${answerChoice}</answerChoice>
    </AnswerVM>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.AnswerVMResponse[0]);
    })).toPromise();
  }

  ApplyEvcModeVM_Task() {

  }

  AttachDisk_Task() {

  }

  CheckCustomizationSpec() {

  }

  CloneVM_Task(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' },
    managedFolder: ManagedObjectReference & { type: 'Folder' },
    name: string,
    VirtualMachineCloneSpec: VirtualMachineCloneSpec, // TODO
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
  <CloneVM_Task xmlns="urn:vim25">
    <_this type="VirtualMachine">${managedObject.value}</_this>
    <folder type="Folder">${managedFolder.value}</folder>
    <name>${name}</name>
    <spec>${VirtualMachineCloneSpec}</spec>
  </CloneVM_Task>
</soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.CloneVM_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.CloneVM_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  ConsolidateVMDisks_Task() {

  }

  CreateScreenshot_Task() {

  }

  CreateSecondaryVM_Task() {

  }

  CreateSecondaryVMEx_Task() {

  }

  CreateSnapshot_Task(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' },
    name: string,
    memory: boolean,
    quiesce: boolean,
    description?: string,
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CreateSnapshot_Task xmlns="urn:vim25">
      <_this type="VirtualMachine">${managedObject.value}</_this>
      <name>${name}</name>
      ${(description ? `<description>${description}</description>` : '')}
      <memory>${memory}</memory>
      <quiesce>${quiesce}</quiesce>
    </CreateSnapshot_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.CreateSnapshot_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return this.SysosLibVmwareHelper.validResponse(data.CreateSnapshot_TaskResponse[0].returnval[0]);
    })).toPromise();
  }

  CreateSnapshotEx_Task() {

  }

  CryptoUnlock_Task() {

  }

  CustomizeVM_Task() {

  }

  DefragmentAllDisks() {

  }

  DetachDisk_Task() {

  }

  DisableSecondaryVM_Task() {

  }

  EnableSecondaryVM_Task() {

  }

  EstimateStorageForConsolidateSnapshots_Task() {

  }

  ExportVm() {

  }

  ExtractOvfEnvironment() {

  }

  InstantClone_Task() {

  }

  MakePrimaryVM_Task() {

  }

  MarkAsTemplate() {

  }

  MarkAsVirtualMachine() {

  }

  MigrateVM_Task() {

  }

  MountToolsInstaller() {

  }

  PowerOffVM_Task(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
  <PowerOffVM_Task xmlns="urn:vim25">
    <_this type="VirtualMachine">${managedObject.value}</_this>
  </PowerOffVM_Task>
</soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.PowerOffVM_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.PowerOffVM_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  PowerOnVM_Task(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' },
    managedHost?: ManagedObjectReference & { type: 'HostSystem' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
  <PowerOnVM_Task xmlns="urn:vim25">
    <_this type="VirtualMachine">${managedObject.value}</_this>
    ${(managedHost ? `<host type="HostSystem">${managedHost.value}</host>` : '')}
  </PowerOnVM_Task>
</soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.PowerOnVM_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.PowerOnVM_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  PromoteDisks_Task() {

  }

  PutUsbScanCodes() {

  }

  QueryChangedDiskAreas() {

  }

  QueryFaultToleranceCompatibility() {

  }

  QueryFaultToleranceCompatibilityEx() {

  }

  QueryUnownedFiles() {

  }

  RebootGuest(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' }
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RebootGuest xmlns="urn:vim25">
      <_this type="VirtualMachine">${managedObject.value}</_this>
    </RebootGuest>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.RebootGuestResponse[0]);
    })).toPromise();
  }

  ReconfigVM_Task(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' },
    VirtualMachineCloneSpec: VirtualMachineCloneSpec, // TODO
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
  <ReconfigVM_Task xmlns="urn:vim25">
    <_this type="VirtualMachine">${managedObject.value}</_this>
    <spec>${VirtualMachineCloneSpec}</spec>
  </ReconfigVM_Task>
</soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.ReconfigVM_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.ReconfigVM_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  RefreshStorageInfo() {

  }

  reloadVirtualMachineFromPath_Task() {

  }

  RelocateVM_Task() {

  }

  RemoveAllSnapshots_Task() {

  }

  ResetGuestInformation() {

  }

  ResetVM_Task(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ResetVM_Task xmlns="urn:vim25">
      <_this type="VirtualMachine">${managedObject.value}</_this>
    </ResetVM_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.ResetVM_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.ResetVM_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  RevertToCurrentSnapshot_Task() {

  }

  SendNMI() {

  }

  SetDisplayTopology() {

  }

  SetScreenResolution() {

  }

  ShutdownGuest(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' }
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ShutdownGuest xmlns="urn:vim25">
      <_this type="VirtualMachine">${managedObject.value}</_this>
    </ShutdownGuest>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.ShutdownGuestResponse[0]);
    })).toPromise();
  }

  StandbyGuest() {

  }

  StartRecording_Task() {

  }

  StartReplaying_Task() {

  }

  StopRecording_Task() {

  }

  StopReplaying_Task() {

  }

  SuspendVM_Task(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
<soap:Body>
  <SuspendVM_Task xmlns="urn:vim25">
    <_this type="VirtualMachine">${managedObject.value}</_this>
  </SuspendVM_Task>
</soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.SuspendVM_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.SuspendVM_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  TerminateFaultTolerantVM_Task() {

  }

  TerminateVM() {

  }

  TurnOffFaultToleranceForVM_Task() {

  }

  UnmountToolsInstaller() {

  }

  UnregisterVM(
    connectionData: connectionData,
    managedObject: ManagedObjectReference & { type: 'VirtualMachine' }
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <UnregisterVM xmlns="urn:vim25">
      <_this type="VirtualMachine">${managedObject.value}</_this>
    </UnregisterVM>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.UnregisterVMResponse[0]);
    })).toPromise();
  }

  UpgradeTools_Task() {

  }

  UpgradeVM_Task() {

  }
}
