import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureVmwareTemplateHelpersService {

  constructor() {
  }

  getObjectIconClass(vmwareObject) {
    if (vmwareObject.type === 'vmware') return 'vs-icon vsphere-icon-vcenter';
    if (vmwareObject.type === 'Datacenter') return 'vs-icon vsphere-icon-datacenter';
    if (vmwareObject.type === 'ClusterComputeResource') return 'vs-icon vsphere-icon-cluster';
    if (vmwareObject.type === 'HostSystem') {
      return (vmwareObject.info.data.runtime.powerState === 'poweredOff' ? 'vsphere-icon-host-disconnected' :
          vmwareObject.info.data.runtime.powerState === 'poweredOn' ? 'vsphere-icon-host' : ''
      );
    }
    if (vmwareObject.type === 'Folder') return 'vs-icon vsphere-icon-folder';
    if (vmwareObject.type === 'ResourcePool') return 'vs-icon vsphere-icon-resource-pool';
    if (vmwareObject.type === 'VirtualApp') return 'vs-icon vsphere-icon-vapp';
    if (vmwareObject.type === 'VirtualMachine') {
      return (vmwareObject.info.data['runtime.powerState'] === 'poweredOff' ? 'vsphere-icon-vm' :
          vmwareObject.info.data['runtime.powerState'] === 'poweredOn' ? 'vsphere-icon-vm-on' :
            vmwareObject.info.data['runtime.powerState'] === 'suspended' ? 'vsphere-icon-vm-suspended' :
              vmwareObject.info.data['runtime.connectionState'] === 'inaccessible' ? 'vsphere-icon-vm-error' : ''
      );
    }
    if (vmwareObject.type === 'StoragePod') return 'vs-icon vsphere-icon-datastore-cluster';
    if (vmwareObject.type === 'Datastore') {
      return (vmwareObject.info.data['summary.accessible'] === 'true' ? 'vsphere-icon-datastore' :
          vmwareObject.info.data['summary.accessible'] === 'false' ? 'vsphere-icon-datastore-inaccessible' : ''
      );
    }
    if (vmwareObject.type === 'Network') return 'vs-icon vsphere-icon-network';
    if (vmwareObject.type === 'VmwareDistributedVirtualSwitch') return 'vs-icon vsphere-icon-dv-switch';
    if (vmwareObject.type === 'DistributedVirtualPortgroup') return 'vs-icon vsphere-icon-virtual-port-group';
    return '';
  }

  isVmObject(vmwareObject) {
    return vmwareObject.type === 'VirtualMachine' || vmwareObject.type === 'VirtualApp';
  }

  getObjectType(vmwareObject) {
    return vmwareObject.type;
  }
}
