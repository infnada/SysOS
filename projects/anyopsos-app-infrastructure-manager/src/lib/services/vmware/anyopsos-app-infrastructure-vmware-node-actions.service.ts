import {Injectable} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibVmwareService} from '@anyopsos/lib-vmware';

import {AnyOpsOSAppInfrastructureManagerService} from '../anyopsos-app-infrastructure-manager.service';

import {ConnectionVmware} from '../../types/connections/connection-vmware';
import {ImDataObject} from '../../types/im-data-object';
import {VMWareVM} from '../../types/vmware-vm';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureVmwareNodeActionsService {

  constructor(private logger: AnyOpsOSLibLoggerService,
              private VMWare: AnyOpsOSLibVmwareService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  /**
   * Perform basic VM operations
   */
  doWithVM(connectionUuid: string, vm: ImDataObject & { info: { data: VMWareVM } }, action: 'powerOn' | 'powerOff' | 'suspend' | 'reset' | 'powerOffGuestOS' | 'restartGuestOS' | 'refresh'): void {

    const connection: ConnectionVmware = this.InfrastructureManager.getConnectionByUuid(connectionUuid) as ConnectionVmware;

    this.VMWare.connectvCenterSoap(connection).then((connectSoapResult) => {
      if (connectSoapResult.status === 'error') throw {error: connectSoapResult.error, description: 'Failed to connect to VMWare'};

      return this.VMWare.getVMRuntime(
        connection,
        vm.info.obj.name
      );
    }).then((vmRuntimeResult) => {
      if (vmRuntimeResult.status === 'error') throw {error: vmRuntimeResult.error, description: 'Failed to get VM runtime'};

      // powerOn
      if (action === 'powerOn') {
        if (vmRuntimeResult.data.propSet.runtime.powerState === 'poweredOn') return vmRuntimeResult;
        return this.VMWare.PowerOnVM_Task(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name},
          {$type: 'HostSystem', _value: vmRuntimeResult.data.propSet.runtime.host.name},
          true
        );
      }

      // powerOff
      if (action === 'powerOff') {
        if (vmRuntimeResult.data.propSet.runtime.powerState === 'poweredOff') return vmRuntimeResult;
        return this.VMWare.PowerOffVM_Task(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name},
          true
        );
      }

      // suspend
      if (action === 'suspend') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.SuspendVM_Task(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name},
          true
        );
      }

      // reset
      if (action === 'reset') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.ResetVM_Task(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name},
          true
        );
      }

      // powerOffGuestOS
      if (action === 'powerOffGuestOS') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.ShutdownGuest(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name}
        );
      }

      // restartGuestOS
      if (action === 'restartGuestOS') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;
        return this.VMWare.RebootGuest(
          connection,
          {$type: 'VirtualMachine', _value: vm.info.obj.name}
        );
      }

      // refresh
      if (action === 'refresh') {
        // TODO: still needed?
      }

    }).then((vmActionResult) => {
      if (vmActionResult.status === 'error') throw {error: vmActionResult.error, description: `Failed to ${action} off VM`};
    }).catch((e) => {
      this.logger.error((e.description ? e.description : e.message), `Error while ${action} on VMWare VM`);

      throw e;
    });

  }

}
