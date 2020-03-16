import {Injectable} from '@angular/core';

import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibNodeVmwareSoapApiService, AnyOpsOSLibNodeVmwareSoapApiHelpersService} from '@anyopsos/lib-node-vmware';
import {VMWareVM} from '@anyopsos/module-node-vmware';
import {VmwareSdkFunctionsOutput} from '@anyopsos/sdk-vmware';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';


@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureVmwareNodeActionsService {

  constructor(private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibNodeVmwareSoapApiService: AnyOpsOSLibNodeVmwareSoapApiService,
              private readonly LibNodeVmwareSoapApiHelpersService: AnyOpsOSLibNodeVmwareSoapApiHelpersService) {
  }

  /**
   * Perform basic VM operations
   */
  async doWithVM(connectionUuid: string, vm: DataObject & { info: { data: VMWareVM; } }, action: 'powerOn' | 'powerOff' | 'suspend' | 'reset' | 'powerOffGuestOS' | 'restartGuestOS' | 'refresh'): Promise<void> {

    return this.LibNodeVmwareSoapApiHelpersService.getVMRuntime(connectionUuid, vm.info.obj.name).then((vmRuntimeResult: VmwareSdkFunctionsOutput<'RetrieveProperties'>) => {
      if (vmRuntimeResult.status === 'error') throw {error: vmRuntimeResult.error, description: 'Failed to get VM runtime'};

      // powerOn
      if (action === 'powerOn') {
        if (vmRuntimeResult.data.propSet.runtime.powerState === 'poweredOn') return;

        // @ts-ignore TODO
        return this.LibNodeVmwareSoapApiService.callSoapApi(connectionUuid, 'PowerOnVM_Task', {
          _this: {
            $type: 'VirtualMachine',
            _value: vm.info.obj.name
          },
          host: {
            $type: 'HostSystem',
            // @ts-ignore TODO
            _value: vmRuntimeResult.data.propSet.runtime.host.name
          }
        });

      }

      // powerOff
      if (action === 'powerOff') {
        if (vmRuntimeResult.data.propSet.runtime.powerState === 'poweredOff') return vmRuntimeResult;

        return this.LibNodeVmwareSoapApiService.callSoapApi(connectionUuid, 'PowerOffVM_Task', {
          _this: {
            $type: 'VirtualMachine',
            _value: vm.info.obj.name
          }
        });

      }

      // suspend
      if (action === 'suspend') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;

        return this.LibNodeVmwareSoapApiService.callSoapApi(connectionUuid, 'SuspendVM_Task', {
          _this: {
            $type: 'VirtualMachine',
            _value: vm.info.obj.name
          }
        });

      }

      // reset
      if (action === 'reset') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;

        return this.LibNodeVmwareSoapApiService.callSoapApi(connectionUuid, 'ResetVM_Task', {
          _this: {
            $type: 'VirtualMachine',
            _value: vm.info.obj.name
          }
        });

      }

      // powerOffGuestOS
      if (action === 'powerOffGuestOS') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;

        return this.LibNodeVmwareSoapApiService.callSoapApi(connectionUuid, 'ShutdownGuest', {
          _this: {
            $type: 'VirtualMachine',
            _value: vm.info.obj.name
          }
        });

      }

      // restartGuestOS
      if (action === 'restartGuestOS') {
        if (vmRuntimeResult.data.propSet.runtime.powerState !== 'poweredOn') return vmRuntimeResult;

        return this.LibNodeVmwareSoapApiService.callSoapApi(connectionUuid, 'RebootGuest', {
          _this: {
            $type: 'VirtualMachine',
            _value: vm.info.obj.name
          }
        });

      }

    }).then((vmActionResult) => {
      if (vmActionResult.status === 'error') throw {error: vmActionResult.error, description: `Failed to ${action} off VM`};
    }).catch((e) => {
      this.logger.error((e.description ? e.description : e.message), `Error while ${action} on VMWare VM`);

      throw e;
    });

  }

}
