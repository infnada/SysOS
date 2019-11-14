import {Component, Input} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

import {SysosLibLoggerService} from '@sysos/lib-logger';
import {SysosLibServiceInjectorService} from '@sysos/lib-service-injector';
import {SysosLibModalService} from '@sysos/lib-modal';
import {SysosLibVmwareService} from '@sysos/lib-vmware';
import {SysosLibNetappService} from '@sysos/lib-netapp';
import {
  SysosAppInfrastructureManagerUtilsService,
  ImConnection,
  ImDataObject,
  VMWareVM,
  VMWareHost,
  VMWareFirewallRule,
  NetAppIface,
  NetAppVserver,
  NetAppVolume
} from '@sysos/app-infrastructure-manager';
import {NetAppSnapshot} from "../../../sysos-app-infrastructure-manager/src/lib/types/netapp-snapshot";

@Component({
  selector: 'smesx-sysos-modal-esxi-selectable',
  templateUrl: './sysos-modal-esxi-selectable.component.html',
  styleUrls: ['./sysos-modal-esxi-selectable.component.scss']
})
export class SysosModalEsxiSelectableComponent {
  @Input() type: string;
  @Input() obj: ImDataObject & { info: { data: NetAppSnapshot | NetAppVolume | VMWareVM } };

  private InfrastructureManager;
  private InfrastructureManagerObjectHelper;
  private InfrastructureManagerVMWare;

  selectedHost: ImDataObject & { info: { data: VMWareHost } };
  selectedIface: ImDataObject & { info: { data: NetAppIface } };
  selectedSnapshot: ImDataObject & { info: { data: NetAppSnapshot } };
  ESXIHosts: (ImDataObject & { info: { data: VMWareHost } })[];

  private hostData;
  finishLoading: boolean = false;
  foundIp: boolean = false;
  foundIfaces: (ImDataObject & { info: { data: NetAppIface } })[];
  sameSubnetIp: (ImDataObject & { info: { data: NetAppIface } })[] = [];
  manualIp: boolean = false;
  forceManualIp: boolean = false;
  ifaceServiceData: {
    'is-nfsv3-enabled': boolean;
    'is-nfsv41-enabled': boolean;
  };

  constructor(public activeModal: NgbActiveModal,
              private logger: SysosLibLoggerService,
              private Toastr: ToastrService,
              private serviceInjector: SysosLibServiceInjectorService,
              private Modal: SysosLibModalService,
              private VMWare: SysosLibVmwareService,
              private NetApp: SysosLibNetappService,
              private InfrastructureManagerUtils: SysosAppInfrastructureManagerUtilsService) {

    this.InfrastructureManager = this.serviceInjector.get('SysosAppInfrastructureManagerService');
    this.InfrastructureManagerObjectHelper = this.serviceInjector.get('SysosAppInfrastructureManagerObjectHelperService');
    this.InfrastructureManagerVMWare = this.serviceInjector.get('SysosAppInfrastructureVmwareService');

    this.ESXIHosts = this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'HostSystem');
  }

  getHostOfConnection(host: ImDataObject & { info: { data: VMWareHost } }): string {
    return this.InfrastructureManager.getConnectionByUuid(host.info.mainUuid).host;
  }

  checkESXidata(): void {
    this.ifaceServiceData = null;
    this.foundIp = false;
    this.manualIp = false;
    this.forceManualIp = false;
    this.finishLoading = false;
    this.sameSubnetIp = [];

    const selectedHostConnection: ImConnection = this.InfrastructureManager.getConnectionByUuid(this.selectedHost.info.mainUuid);

    // Get Volume IP and Protocol
    this.foundIfaces = this.InfrastructureManagerObjectHelper.getObjectsByType(this.storage.uuid, 'netiface').filter((iface: ImDataObject & { info: { data: NetAppIface } }) => {
      return iface.info.data.role === 'data' &&
        iface.info.data.vserver === this.vserver.name &&
        iface.info.data['operational-status'] === 'up' &&
        iface.info.data['administrative-status'] === 'up' &&
        iface.info.data['current-node'] === this.volume.info.data['volume-id-attributes'].node; // TODO: necessary this check?
    });

    this.Modal.openLittleModal('PLEASE WAIT', 'Connecting to vCenter...', '.modal-esxi-selectable', 'plain').then(() => {

      return this.VMWare.connectvCenterSoap(selectedHostConnection);
    }).then((connectSoapResult) => {
      if (connectSoapResult.status === 'error') throw {
        error: connectSoapResult.error,
        description: 'Failed to connect to vCenter'
      };

      this.Modal.changeModalText('Getting data...', '.modal-esxi-selectable');

      return this.VMWare.getHost(selectedHostConnection, this.selectedHost.info.obj.name);
    }).then((hostResult) => {
      if (hostResult.status === 'error') throw {
        error: hostResult.error,
        description: 'Failed to get Host data from vCenter'
      };

      console.log(hostResult.data);

      this.hostData = hostResult.data;

      // If it's an Object (only 1 managed datastore) convert to array
      if (!Array.isArray(hostResult.data.datastore.ManagedObjectReference)) {
        hostResult.data.datastore.ManagedObjectReference = [hostResult.data.datastore.ManagedObjectReference];
      }

      // Check if some of the datastores IPs match foundIfaces IP
      hostResult.data.datastore.ManagedObjectReference.forEach((datastoreObj) => {
        this.VMWare.getDatastoreProps(selectedHostConnection, datastoreObj.name).then((datastoreResult) => {
          if (datastoreResult.status === 'error') throw {
            error: datastoreResult.error,
            description: 'Failed to get Datastore data from vCenter'
          };

          console.log(datastoreResult);

          /*data.summary.type === 'NFS41'
          data.info.nas.type
          data.info.nas.remoteHost
          data.info.nas.remoteHostNames*/

          // TODO: foundIp true?
        });
      });

      // Check if one of foundIfaces IP is within same subnet of host network
      if (!this.foundIp) {
        this.foundIfaces.forEach((iface: ImDataObject & { info: { data: NetAppIface } }) => {
          // TODO: get correct ESXi address
          // TODO: choose the lowest netmask
          if (this.InfrastructureManagerUtils.ipInSameSubnet(hostResult.data.config.network.vnic.spec.ip.ipAddress, iface.info.data.address, iface.info.data.netmask)) {
            this.sameSubnetIp.push(iface);
          }
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
    }).catch((e) => {
      this.logger.error('Infrastructure Manager', 'Error while getting VMWare data', null, e.description);

      if (this.Modal.isModalOpened('.modal-esxi-selectable')) {
        this.Modal.changeModalType('danger', '.modal-esxi-selectable');
        this.Modal.changeModalText((e.description ? e.description : e.message), '.modal-esxi-selectable');
      }

      this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from VMWare');

      throw e;
    });
  }

  checkIface(): void {

    if (this.selectedIface.info.data['data-protocols']['data-protocol'] === 'nfs' && !this.ifaceServiceData) {
      this.Modal.openLittleModal('PLEASE WAIT', 'Checking storage service status...', '.modal-esxi-selectable', 'plain').then(() => {

        return this.NetApp.getNFSService(this.storage.credential, this.storage.host, this.storage.port, this.vserver.name);
      }).then((nfsServiceResult) => {
        if (nfsServiceResult.status === 'error') throw {
          error: nfsServiceResult.error,
          description: 'Failed to get NFS service status from Storage'
        };

        this.ifaceServiceData = nfsServiceResult.data;
        this.Modal.closeModal('.modal-esxi-selectable');
      }).catch((e) => {
        this.logger.error('Infrastructure Manager', 'Error while getting NetApp data', null, e.description);

        if (this.Modal.isModalOpened('.modal-esxi-selectable')) {
          this.Modal.changeModalType('danger', '.modal-esxi-selectable');
          this.Modal.changeModalText((e.description ? e.description : e.message), '.modal-esxi-selectable');
        }

        this.Toastr.error((e.description ? e.description : e.message), 'Error getting data from NetApp');

        throw e;
      });
    }

  }

  checkFirewallNFS(nfsVersion: number): boolean {
    if (this.hostData.config.firewall.defaultPolicy.outgoingBlocked === false) return true;

    const firewallRule: VMWareFirewallRule = this.hostData.config.firewall.ruleset.find((rule: VMWareFirewallRule) => {
      return rule.key === (nfsVersion === 3 ? 'nfsClient' : 'nfs41Client');
    });

    // No default rule found
    if (!firewallRule) return false;

    if (firewallRule.allowedHosts.allIp === true) return true;
    if (firewallRule.allowedHosts.ipAddress && typeof firewallRule.allowedHosts.ipAddress === 'string' && firewallRule.allowedHosts.ipAddress === this.selectedIface.info.data.address) return true;
    if (firewallRule.allowedHosts.ipAddress && Array.isArray(firewallRule.allowedHosts.ipAddress) && firewallRule.allowedHosts.ipAddress.includes(this.selectedIface.info.data.address)) return true;
    // TODO check when is a network instead of an IP

    return false;
  }

}
