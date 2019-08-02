import {Component, Input, OnInit} from '@angular/core';

import {Application} from '@sysos/lib-application';

import {VMWareObject} from '../../types/vmware-object';

@Component({
  selector: 'saim-body-vmware',
  templateUrl: './body-vmware.component.html',
  styleUrls: ['./body-vmware.component.scss']
})
export class BodyVmwareComponent implements OnInit {
  @Input() vmwareObject: VMWareObject;
  @Input() application: Application;

  constructor() {
  }

  ngOnInit() {
  }

  getObjectIconClass() {
    if (this.vmwareObject.type === 'vmware') return 'vs-icon vsphere-icon-vcenter';
    if (this.vmwareObject.type === 'Datacenter') return 'vs-icon vsphere-icon-datacenter';
    if (this.vmwareObject.type === 'ClusterComputeResource') return 'vs-icon vsphere-icon-cluster';
    if (this.vmwareObject.type === 'HostSystem') {
      return (this.vmwareObject.info.data.runtime.powerState === 'poweredOff' ? 'vsphere-icon-host-disconnected' :
        this.vmwareObject.info.data.runtime.powerState === 'poweredOn' ? 'vsphere-icon-host' : ''
      );
    }
    if (this.vmwareObject.type === 'Folder') return 'vs-icon vsphere-icon-folder';
    if (this.vmwareObject.type === 'ResourcePool') return 'vs-icon vsphere-icon-resource-pool';
    if (this.vmwareObject.type === 'VirtualApp') return 'vs-icon vsphere-icon-vapp';
    if (this.vmwareObject.type === 'VirtualMachine') {
      return (this.vmwareObject.info.data['runtime.powerState'] === 'poweredOff' ? 'vsphere-icon-vm' :
        this.vmwareObject.info.data['runtime.powerState'] === 'poweredOn' ? 'vsphere-icon-vm-on' :
          this.vmwareObject.info.data['runtime.powerState'] === 'suspended' ? 'vsphere-icon-vm-suspended' :
            this.vmwareObject.info.data['runtime.connectionState'] === 'inaccessible' ? 'vsphere-icon-vm-error' : ''
      );
    }
    if (this.vmwareObject.type === 'StoragePod') return 'vs-icon vsphere-icon-datastore-cluster';
    if (this.vmwareObject.type === 'Datastore') {
      return (this.vmwareObject.info.data['summary.accessible'] === 'true' ? 'vsphere-icon-datastore' :
          this.vmwareObject.info.data['summary.accessible'] === 'false' ? 'vsphere-icon-datastore-inaccessible' : ''
      );
    }
    if (this.vmwareObject.type === 'Network') return 'vs-icon vsphere-icon-network';
    if (this.vmwareObject.type === 'VmwareDistributedVirtualSwitch') return 'vs-icon vsphere-icon-dv-switch';
    if (this.vmwareObject.type === 'DistributedVirtualPortgroup') return 'vs-icon vsphere-icon-virtual-port-group';
    return '';
  }

  isVmObject() {
    return this.vmwareObject.type === 'VirtualMachine' || this.vmwareObject.type === 'VirtualApp';
  }

  showActionsMenu() {

  }

}
