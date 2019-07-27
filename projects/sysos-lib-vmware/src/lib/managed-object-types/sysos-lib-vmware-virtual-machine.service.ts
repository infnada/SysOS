import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {VirtualMachineCloneSpec} from '../types/virtual-machine-clone-spec';
import {VirtualMachineConfigSpec} from "../types/virtual-machine-config-spec";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareVirtualMachineService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AcquireMksTicket() {

  }

  AcquireTicket(
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
    ticketType: string
  ) {
    const xml = `<AcquireTicket xmlns='urn:vim25'>
      <_this type='VirtualMachine'>${managedVM._value}</_this>
      <ticketType>${ticketType}</ticketType>
    </AcquireTicket>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.AcquireTicketResponse[0].returnval[0]);
    })).toPromise();
  }

  AnswerVM(
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
    questionId: string,
    answerChoice: string
  ) {
    const xml = `<AnswerVM xmlns='urn:vim25'>
      <_this type='VirtualMachine'>${managedVM._value}</_this>
      <questionId>${questionId}</questionId>
      <answerChoice>${answerChoice}</answerChoice>
    </AnswerVM>`;
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
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
    managedFolder: ManagedObjectReference & { $type: 'Folder' },
    name: string,
    spec: VirtualMachineCloneSpec,
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<CloneVM_Task xmlns='urn:vim25'>
    <_this type='VirtualMachine'>${managedVM._value}</_this>
    <folder type='Folder'>${managedFolder._value}</folder>
    <name>${name}</name>
    <spec>${this.SysosLibVmwareHelper.setDynamicProperties(spec)}</spec>
  </CloneVM_Task>`;
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
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
    name: string,
    memory: boolean,
    quiesce: boolean,
    description?: string,
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<CreateSnapshot_Task xmlns='urn:vim25'>
      <_this type='VirtualMachine'>${managedVM._value}</_this>
      <name>${name}</name>
      ${(description ? `<description>${description}</description>` : '')}
      <memory>${memory}</memory>
      <quiesce>${quiesce}</quiesce>
    </CreateSnapshot_Task>`;
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
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<PowerOffVM_Task xmlns='urn:vim25'>
    <_this type='VirtualMachine'>${managedVM._value}</_this>
  </PowerOffVM_Task>`;
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
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
    managedHost?: ManagedObjectReference & { $type: 'HostSystem' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<PowerOnVM_Task xmlns='urn:vim25'>
    <_this type='VirtualMachine'>${managedVM._value}</_this>
    ${(managedHost ? `<host type='HostSystem'>${managedHost._value}</host>` : '')}
  </PowerOnVM_Task>`;
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
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' }
  ) {
    const xml = `<RebootGuest xmlns='urn:vim25'>
      <_this type='VirtualMachine'>${managedVM._value}</_this>
    </RebootGuest>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.RebootGuestResponse[0]);
    })).toPromise();
  }

  ReconfigVM_Task(
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
    spec: VirtualMachineConfigSpec,
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<ReconfigVM_Task xmlns='urn:vim25'>
    <_this type='VirtualMachine'>${managedVM._value}</_this>
    <spec>${this.SysosLibVmwareHelper.setDynamicProperties(spec)}</spec>
  </ReconfigVM_Task>`;
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
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<ResetVM_Task xmlns='urn:vim25'>
      <_this type='VirtualMachine'>${managedVM._value}</_this>
    </ResetVM_Task>`;
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
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' }
  ) {
    const xml = `<ShutdownGuest xmlns='urn:vim25'>
      <_this type='VirtualMachine'>${managedVM._value}</_this>
    </ShutdownGuest>`;
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
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<SuspendVM_Task xmlns='urn:vim25'>
    <_this type='VirtualMachine'>${managedVM._value}</_this>
  </SuspendVM_Task>`;
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
    connectionData: ConnectionData,
    managedVM: ManagedObjectReference & { $type: 'VirtualMachine' }
  ) {
    const xml = `<UnregisterVM xmlns='urn:vim25'>
      <_this type='VirtualMachine'>${managedVM._value}</_this>
    </UnregisterVM>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.UnregisterVMResponse[0]);
    })).toPromise();
  }

  UpgradeTools_Task() {

  }

  UpgradeVM_Task() {

  }
}
