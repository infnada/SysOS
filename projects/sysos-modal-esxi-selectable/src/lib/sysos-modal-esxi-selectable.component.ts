import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibVmwareService} from "@sysos/lib-vmware";
import {SysosLibModalService} from "@sysos/lib-modal";
import {IMConnection, IMESXiHost, NetAppVserver, NetAppVolume} from '@sysos/app-infrastructure-manager';

@Component({
  selector: 'smesx-sysos-modal-esxi-selectable',
  templateUrl: './sysos-modal-esxi-selectable.component.html',
  styleUrls: ['./sysos-modal-esxi-selectable.component.scss']
})
export class SysosModalEsxiSelectableComponent {
  @Input() storage: IMConnection;
  @Input() vserver: NetAppVserver;
  @Input() volume: NetAppVolume;

  private InfrastructureManagerVMWare;

  selectedHost: IMESXiHost;
  ESXIHosts: IMESXiHost[];

  foundIp: boolean;
  sameSubnetIp: string[] = [];

  constructor(public activeModal: NgbActiveModal,
              private serviceInjector: SysosLibServiceInjectorService,
              private Modal: SysosLibModalService,
              private VMWare: SysosLibVmwareService) {

    this.InfrastructureManagerVMWare = this.serviceInjector.get('SysosAppInfrastructureVmwareService');
    this.ESXIHosts = this.InfrastructureManagerVMWare.getESXihosts();
  }

  checkESXidata($event) {
    console.log($event);
    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter...', '.modal-esxi-selectable', 'plain');

    this.VMWare.connectvCenterSoap(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port).then((res) => {
      if (res.status === 'error') throw new Error('Failed to connect to vCenter');

      this.Modal.changeModalText('Getting data...', '.modal-esxi-selectable');

      // check if any found IP is already used by any datastore on the selected host
      //  if found, use that ip
      // match any found IP within same subnet of host network
      //  check host config.firewall protocol for the found IP
      //    advertise permanent firewall changes if required

      // TODO export: host.config.network.vnic.spec.ip.ipAddress

      return this.VMWare.getHost(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port, this.selectedHost.host.host);
    }).then((hostData) => {
      if (hostData.status === 'error') throw new Error('Failed to get Host from vCenter');

      console.log(hostData);

      this.foundIp = false;

      // Get Volume IP and Protocol
      const foundIfaces = this.storage.data.Ifaces.netifaces.filter((iface) => {
        return iface.role === 'data' && iface.vserver === this.vserver['vserver-name'];
      });

      console.log(foundIfaces);

      // Check if some of the datastores IPs match foundIfaces IP
      hostData.data.datastore.ManagedObjectReference.forEach((datastore) => {
        this.VMWare.getDatastoreProps(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port, datastore.name).then((datastoreData) => {
          console.log(datastoreData);

          // TODO: foundIp true?
        });
      });

      // Check if one of foundIfaces IP is within same subnet of host network
      if (!this.foundIp) {
        const ipInSameSubnet = (addr1: string, addr2: string, mask: string): boolean => {
          const res1 = [];
          const res2 = [];
          const arr1 = addr1.split(".");
          const arr2 = addr2.split(".");
          const arrmask  = mask.split(".");

          for (let i = 0; i < arr1.length; i++){
            res1.push(parseInt(arr1[i]) & parseInt(arrmask[i]));
            res2.push(parseInt(arr2[i]) & parseInt(arrmask[i]));
          }
          return res1.join(".") === res2.join(".");
        };

        foundIfaces.forEach((iface) => {
          if (ipInSameSubnet(hostData.data.config.network.vnic.spec.ip.ipAddress, iface.address, iface.netmask)) this.sameSubnetIp.push(iface);
        });



      }



      // Get Host firewall rules data
      return this.VMWare.getHostFirewallRules(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port, this.selectedHost.host.host);
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Host firewall rules from vCenter');

      console.log(res);

      // Get Host data
      return this.VMWare.getHostFirewallSystem(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port, this.selectedHost.host.host);
    }).then((res) => {
      if (res.status === 'error') throw new Error('Failed to get Host firewallSystem from vCenter');

      console.log(res);

      this.Modal.closeModal('.modal-esxi-selectable');

    });
  }

}
