import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibVmwareService} from '@sysos/lib-vmware';
import {SysosLibNetappService} from "@sysos/lib-netapp";
import {IMConnection, IMESXiHost, NetAppIface, NetAppVserver, NetAppVolume, VMWareFirewallRule} from '@sysos/app-infrastructure-manager';

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
  private hostData;

  selectedHost: IMESXiHost;
  selectedIface: NetAppIface;
  ESXIHosts: IMESXiHost[];

  finishLoading: boolean = false;
  foundIp: boolean = false;
  foundIfaces: NetAppIface[];
  sameSubnetIp: NetAppIface[] = [];
  manualIp: boolean = false;
  forceManualIp: boolean = false;
  ifaceServiceData: {
    'is-nfsv3-enabled': boolean;
    'is-nfsv41-enabled': boolean;
  };

  constructor(public activeModal: NgbActiveModal,
              private serviceInjector: SysosLibServiceInjectorService,
              private Modal: SysosLibModalService,
              private VMWare: SysosLibVmwareService,
              private NetApp: SysosLibNetappService) {

    this.InfrastructureManagerVMWare = this.serviceInjector.get('SysosAppInfrastructureVmwareService');
    this.ESXIHosts = this.InfrastructureManagerVMWare.getESXihosts();
  }

  checkESXidata() {
    this.ifaceServiceData = null;
    this.foundIp = false;
    this.manualIp = false;
    this.forceManualIp = false;
    this.finishLoading = false;
    this.sameSubnetIp = [];

    // Get Volume IP and Protocol
    this.foundIfaces = this.storage.data.Ifaces.netifaces.filter((iface) => {
      return iface.role === 'data' &&
        iface.vserver === this.vserver['vserver-name'] &&
        iface['operational-status'] === 'up' &&
        iface['administrative-status'] === 'up' &&
        iface['current-node'] === this.volume['volume-id-attributes'].node; // TODO: necessary this check?
    });

    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter...', '.modal-esxi-selectable', 'plain');

    this.VMWare.connectvCenterSoap(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port).then((connectionData) => {
      if (connectionData.status === 'error') throw new Error('Failed to connect to vCenter');

      this.Modal.changeModalText('Getting data...', '.modal-esxi-selectable');

      return this.VMWare.getHost(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port, this.selectedHost.host.host);
    }).then((hostData) => {
      if (hostData.status === 'error') throw new Error('Failed to get Host from vCenter');

      console.log(hostData.data);

      this.hostData = hostData.data;

      // Check if some of the datastores IPs match foundIfaces IP
      hostData.data.datastore.ManagedObjectReference.forEach((datastore) => {
        this.VMWare.getDatastoreProps(this.selectedHost.virtual.credential, this.selectedHost.virtual.host, this.selectedHost.virtual.port, datastore.name).then((datastoreData) => {
          console.log(datastoreData);

          /*data.summary.type === 'NFS41'
          data.info.nas.type
          data.info.nas.remoteHost
          data.info.nas.remoteHostNames*/

          // TODO: foundIp true?
        });
      });

      // Check if one of foundIfaces IP is within same subnet of host network
      if (!this.foundIp) {
        const ipInSameSubnet = (addr1: string, addr2: string, mask: string): boolean => {
          const res1 = [];
          const res2 = [];
          const arr1 = addr1.split('.');
          const arr2 = addr2.split('.');
          const arrmask  = mask.split('.');

          for (let i = 0; i < arr1.length; i++) {
            res1.push(parseInt(arr1[i], 10) & parseInt(arrmask[i], 10));
            res2.push(parseInt(arr2[i], 10) & parseInt(arrmask[i], 10));
          }
          return res1.join('.') === res2.join('.');
        };

        this.foundIfaces.forEach((iface) => {
          // TODO: get correct ESXi address
          // TODO: choose the lowest netmask
          if (ipInSameSubnet(hostData.data.config.network.vnic.spec.ip.ipAddress, iface.address, iface.netmask)) this.sameSubnetIp.push(iface);
        });

        // Preselect 1st IP on same subnet
        if (this.sameSubnetIp.length > 0) {
          this.selectedIface = this.sameSubnetIp[0];
          this.checkIface();
        } else {
          // Ask user to select an IP
          this.manualIp = true;
          this.forceManualIp = true;
        }
      }

      this.finishLoading = true;

      // Get Host firewall rules data
      this.Modal.closeModal('.modal-esxi-selectable');
    });
  }

  checkIface() {

    if (this.selectedIface['data-protocols']['data-protocol'] === 'nfs' && !this.ifaceServiceData) {
      this.Modal.openLittleModal('PLEASE WAIT', 'Checking storage service status...', '.modal-esxi-selectable', 'plain');

      this.NetApp.getNFSService(this.storage.credential, this.storage.host, this.storage.port, this.vserver["vserver-name"]).then((serviceData) => {
        if (serviceData.status === 'error') throw new Error('Failed to get NFS service status from Storage');

        this.ifaceServiceData = serviceData.data;
        this.Modal.closeModal('.modal-esxi-selectable');
      });
    }

  }

  checkFirewallNFS(nfsVersion) {
    if (this.hostData.config.firewall.defaultPolicy.outgoingBlocked === false) return true;

    const firewallRule = this.hostData.config.firewall.ruleset.find((rule: VMWareFirewallRule) => {
      return rule.key === (nfsVersion === 3 ? 'nfsClient' : 'nfs41Client');
    });

    // No default rule found
    if (!firewallRule) return false;

    if (firewallRule.allowedHosts.allIp === true) return true;
    if (firewallRule.allowedHosts.ipAddress && typeof firewallRule.allowedHosts.ipAddress === 'string' && firewallRule.allowedHosts.ipAddress === this.selectedIface.address) return true;
    if (firewallRule.allowedHosts.ipAddress && Array.isArray(firewallRule.allowedHosts.ipAddress) && firewallRule.allowedHosts.ipAddress.includes(this.selectedIface.address)) return true;
    // TODO check when is a network instead of an IP

    return false;
  }

}
