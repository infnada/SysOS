import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MatTreeFlatDataSource, MatTreeFlattener, MatMenuTrigger} from '@anyopsos/lib-angular-material';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {ContextMenuItem} from '@anyopsos/lib-types';

import {AnyOpsOSAppInfrastructureManagerService} from '../services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerTreeDataService} from '../services/anyopsos-app-infrastructure-manager-tree-data.service';
import {AnyOpsOSAppInfrastructureManagerContextMenusService} from '../services/anyopsos-app-infrastructure-manager-context-menus.service';
import {AnyOpsOSAppInfrastructureVmwareService} from '../services/vmware/anyopsos-app-infrastructure-vmware.service';
import {AnyOpsOSAppInfrastructureNetappService} from '../services/netapp/anyopsos-app-infrastructure-netapp.service';
import {AnyopsosAppInfrastructureKubernetesService} from '../services/kubernetes/anyopsos-app-infrastructure-kubernetes.service';
import {AnyopsosAppInfrastructureDockerService} from '../services/docker/anyopsos-app-infrastructure-docker.service';
import {AnyopsosAppInfrastructureLinuxService} from '../services/linux/anyopsos-app-infrastructure-linux.service';
import {AnyopsosAppInfrastructureSnmpService} from '../services/snmp/anyopsos-app-infrastructure-snmp.service';

import {ImTreeNode} from '../types/im-tree-node';
import {ConnectionKubernetes} from '../types/connections/connection-kubernetes';
import {ConnectionLinux} from '../types/connections/connection-linux';
import {ConnectionNetapp} from '../types/connections/connection-netapp';
import {ConnectionSnmp} from '../types/connections/connection-snmp';
import {ConnectionVmware} from '../types/connections/connection-vmware';

interface InfrastructureManagerFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  type: string;
}

@Component({
  selector: 'saim-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) contextMenuTree: MatMenuTrigger;
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string;
  activeView: {
    type: string;
    data: {}
  } = {
    type: null,
    data: {}
  };

  viewSide: boolean = true;
  contextMenuPosition = {x: '0px', y: '0px'};

  contextMenus: {[s: string]: ContextMenuItem[]};

  treeControl = new FlatTreeControl<InfrastructureManagerFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: InfrastructureManagerFlatNode) => node.expandable;

  constructor(private Utils: AnyOpsOSLibUtilsService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerTreeData: AnyOpsOSAppInfrastructureManagerTreeDataService,
              private InfrastructureContextMenus: AnyOpsOSAppInfrastructureManagerContextMenusService,
              private InfrastructureManagerNetApp: AnyOpsOSAppInfrastructureNetappService,
              private InfrastructureManagerVMWare: AnyOpsOSAppInfrastructureVmwareService,
              private InfrastructureManagerKubernetes: AnyopsosAppInfrastructureKubernetesService,
              private InfrastructureManagerDocker: AnyopsosAppInfrastructureDockerService,
              private InfrastructureManagerLinux: AnyopsosAppInfrastructureLinuxService,
              private InfrastructureManagerSNMP: AnyopsosAppInfrastructureSnmpService) {

    /**
     * @description Required to avoid circular dependency
     * @link{AnyOpsOSAppInfrastructureManagerService#getObserverConnectGetData}
     */
    this.InfrastructureManager.getObserverConnectGetData().pipe(takeUntil(this.destroySubject$)).subscribe((connection) => {
      if (connection.type === 'netapp') this.InfrastructureManagerNetApp.getNetAppData(connection);
      if (connection.type === 'vmware') this.InfrastructureManagerVMWare.getVMWareData(connection);
      if (connection.type === 'kubernetes') this.InfrastructureManagerKubernetes.initConnection(connection);
      if (connection.type === 'docker') this.InfrastructureManagerDocker.initConnection(connection);
      if (connection.type === 'linux') this.InfrastructureManagerLinux.initConnection(connection);
      if (connection.type === 'snmp') this.InfrastructureManagerSNMP.initConnection(connection);
    });

  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  ngOnInit() {
    this.InfrastructureManager.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(activeConnection => {
      this.activeConnection = activeConnection;

      if (this.activeConnection !== null && this.getActiveConnection(true).state === 'disconnected') {
        setTimeout(() => this.Utils.scrollTo('infrastructure-manager_main-body', true), 100);
      }
    });
    this.InfrastructureManagerTreeData.treeData.pipe(takeUntil(this.destroySubject$)).subscribe(data => {
      this.dataSource.data = data;
      this.treeControl.expandAll();
    });

    // Set Context Menus
    this.contextMenus = {
      kubernetesContextMenu: this.InfrastructureContextMenus.kubernetesContextMenu,
      netappContextMenu: this.InfrastructureContextMenus.netappContextMenu,
      volumeContextMenu: this.InfrastructureContextMenus.volumeContextMenu,
      volumeSnapshotContextMenu: this.InfrastructureContextMenus.volumeSnapshotContextMenu,
      volumeVMSnapshotContextMenu: this.InfrastructureContextMenus.volumeVMSnapshotContextMenu,
      vmwareContextMenu: this.InfrastructureContextMenus.vmwareContextMenu,
      folderDatacenterContextMenu: this.InfrastructureContextMenus.folderDatacenterContextMenu,
      folderDatastoreContextMenu: this.InfrastructureContextMenus.folderDatastoreContextMenu,
      folderVMContextMenu: this.InfrastructureContextMenus.folderVMContextMenu,
      folderNetworkContextMenu: this.InfrastructureContextMenus.folderNetworkContextMenu,
      datacenterContextMenu: this.InfrastructureContextMenus.datacenterContextMenu,
      VMContextMenu: this.InfrastructureContextMenus.VMContextMenu,
      datastoreContextMenu: this.InfrastructureContextMenus.datastoreContextMenu,
      datastoreClusterContextMenu: this.InfrastructureContextMenus.datastoreClusterContextMenu,
      clusterComputeResourceContextMenu: this.InfrastructureContextMenus.clusterComputeResourceContextMenu,
      hostSystemContextMenu: this.InfrastructureContextMenus.hostSystemContextMenu,
      resourcePoolContextMenu: this.InfrastructureContextMenus.resourcePoolContextMenu
    };
  }

  private transformer(node: ImTreeNode, level: number)  {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      type: node.type,
      info: node.info,
      level
    };
  }

  /**
   * ContextMenu
   */
  treeContextMenuItems(item: ImTreeNode) {
    // NetApp
    if (item.type === 'netapp') return this.contextMenus.netappContextMenu;
    if (item.type === 'volume') return this.contextMenus.volumeContextMenu;
    if (item.type === 'snapshot') return this.contextMenus.volumeSnapshotContextMenu;

    // VMWare
    if (item.type === 'vmware') return this.contextMenus.vmwareContextMenu;
    if (item.type === 'Folder' && item.info.data.childType.string.includes('Datacenter')) return this.contextMenus.folderDatacenterContextMenu;
    if (item.type === 'Folder' && (item.info.data.childType.string.includes('Datastore') || item.info.data.childType.string.includes('StoragePod'))) return this.contextMenus.folderDatastoreContextMenu;
    if (item.type === 'Folder' && (item.info.data.childType.string.includes('VirtualMachine') || item.info.data.childType.string.includes('VirtualApp'))) return this.contextMenus.folderVMContextMenu;
    if (item.type === 'Folder' && (item.info.data.childType.string.includes('Network') || item.info.data.childType.string.includes('DistributedVirtualSwitch'))) return this.contextMenus.folderNetworkContextMenu;
    if (item.type === 'Datacenter') return this.contextMenus.datacenterContextMenu;
    if (item.type === 'VirtualMachine') return this.contextMenus.VMContextMenu;
    if (item.type === 'Datastore') return this.contextMenus.datastoreContextMenu;
    if (item.type === 'StoragePod') return this.contextMenus.datastoreClusterContextMenu;
    if (item.type === 'ClusterComputeResource') return this.contextMenus.clusterComputeResourceContextMenu;
    if (item.type === 'HostSystem') return this.contextMenus.hostSystemContextMenu;
    if (item.type === 'ResourcePool') return this.contextMenus.resourcePoolContextMenu;

    // Kubernetes
    if (item.type === 'kubernetes') return this.contextMenus.kubernetesContextMenu;
  }

  onTreeContextMenu(event: MouseEvent, node: ImTreeNode): void {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuTree.menuData = { item: node };
    this.contextMenuTree.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem, node: ImTreeNode): boolean {
    if (item.disabled) return item.disabled(node);
    return false;
  }

  contextToText(item: ContextMenuItem, file?: any): string {
    if (typeof item.text === 'string') return item.text;
    if (typeof item.text === 'function') return item.text(file);
  }
  // End contextMenu

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  setActiveConnection(connectionUuid: string): void {
    return this.InfrastructureManager.setActiveConnection(connectionUuid);
  }

  getActiveConnection(returnMain: boolean = false): ConnectionKubernetes | ConnectionLinux | ConnectionNetapp | ConnectionSnmp | ConnectionVmware {
    return this.InfrastructureManager.getActiveConnection(returnMain);
  }

  setActiveView(type: string, data: any): void {
    this.setActiveConnection(data.info.uuid);
    this.activeView = {
      type,
      data
    };
  }
}
