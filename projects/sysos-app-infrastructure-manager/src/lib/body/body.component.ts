import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatMenuTrigger} from '@angular/material';

import {Subscription} from 'rxjs';

import {Application} from '@sysos/lib-application';
import {ContextMenuItem} from '@sysos/lib-types';

import {SysosAppInfrastructureManagerService} from '../services/sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureManagerContextMenusService} from '../services/sysos-app-infrastructure-manager-context-menus.service';
import {SysosAppInfrastructureNetappService} from '../services/sysos-app-infrastructure-netapp.service';
import {SysosAppInfrastructureVmwareService} from '../services/sysos-app-infrastructure-vmware.service';
import {IMConnection} from '../types/imconnection';
import {IMNode} from '../types/imnode';

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
export class BodyComponent implements OnInit {
  @ViewChild(MatMenuTrigger) contextMenuTree: MatMenuTrigger;
  @Input() application: Application;

  private connectGetDataSubscription: Subscription;

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
  svContextMenu: ContextMenuItem[];
  volumeContextMenu: ContextMenuItem[];
  volumeSnapshotContextMenu: ContextMenuItem[];
  volumeVMSnapshotContextMenu: ContextMenuItem[];
  vmwareContextMenu: ContextMenuItem[];
  folderDatacenterContextMenu: ContextMenuItem[];
  folderDatastoreContextMenu: ContextMenuItem[];
  folderVMContextMenu: ContextMenuItem[];
  folderNetworkContextMenu: ContextMenuItem[];
  datacenterContextMenu: ContextMenuItem[];
  VMContextMenu: ContextMenuItem[];
  datastoreContextMenu: ContextMenuItem[];
  datastoreClusterContextMenu: ContextMenuItem[];
  clusterComputeResourceContextMenu: ContextMenuItem[];
  hostSystemContextMenu: ContextMenuItem[];
  resourcePoolContextMenu: ContextMenuItem[];

  treeControl = new FlatTreeControl<InfrastructureManagerFlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: InfrastructureManagerFlatNode) => node.expandable;

  constructor(private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureContextMenus: SysosAppInfrastructureManagerContextMenusService,
              private InfrastructureManagerNetApp: SysosAppInfrastructureNetappService,
              private InfrastructureManagerVMWare: SysosAppInfrastructureVmwareService) {

    /**
     * @description Required to avoid circular dependency
     * @link{SysosAppInfrastructureManagerService#getObserverConnectGetData}
     */
    this.connectGetDataSubscription = this.InfrastructureManager.getObserverConnectGetData().subscribe((connection) => {
      if (connection.type === 'netapp') this.InfrastructureManagerNetApp.getNetAppData(connection);
      if (connection.type === 'vmware') this.InfrastructureManagerVMWare.getVMWareData(connection);
    });

  }

  ngOnInit() {
    this.InfrastructureManager.activeConnection.subscribe(activeConnection => this.activeConnection = activeConnection);
    this.InfrastructureManager.treeData.subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      this.treeControl.expandAll();
    });

    // Set Context Menus
    this.svContextMenu = this.InfrastructureContextMenus.svContextMenu;
    this.volumeContextMenu = this.InfrastructureContextMenus.volumeContextMenu;
    this.volumeSnapshotContextMenu = this.InfrastructureContextMenus.volumeSnapshotContextMenu;
    this.volumeVMSnapshotContextMenu = this.InfrastructureContextMenus.volumeVMSnapshotContextMenu;
    this.vmwareContextMenu = this.InfrastructureContextMenus.vmwareContextMenu;
    this.folderDatacenterContextMenu = this.InfrastructureContextMenus.folderDatacenterContextMenu;
    this.folderDatastoreContextMenu = this.InfrastructureContextMenus.folderDatastoreContextMenu;
    this.folderVMContextMenu = this.InfrastructureContextMenus.folderVMContextMenu;
    this.folderNetworkContextMenu = this.InfrastructureContextMenus.folderNetworkContextMenu;
    this.datacenterContextMenu = this.InfrastructureContextMenus.datacenterContextMenu;
    this.VMContextMenu = this.InfrastructureContextMenus.VMContextMenu;
    this.datastoreContextMenu = this.InfrastructureContextMenus.datastoreContextMenu;
    this.datastoreClusterContextMenu = this.InfrastructureContextMenus.datastoreClusterContextMenu;
    this.clusterComputeResourceContextMenu = this.InfrastructureContextMenus.clusterComputeResourceContextMenu;
    this.hostSystemContextMenu = this.InfrastructureContextMenus.hostSystemContextMenu;
    this.resourcePoolContextMenu = this.InfrastructureContextMenus.resourcePoolContextMenu;
  }

  private transformer(node: IMNode, level: number)  {
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
  treeContextMenuItems(item: IMNode) {
    if (item.type === 'netapp') return this.svContextMenu;
    if (item.type === 'volume') return this.volumeContextMenu;
    if (item.type === 'snapshot') return this.volumeSnapshotContextMenu;
    if (item.type === 'vmware') return this.vmwareContextMenu;
    if (item.type === 'Folder' && item.info.data.childType.string.includes('Datacenter')) return this.folderDatacenterContextMenu;
    if (item.type === 'Folder' && (item.info.data.childType.string.includes('Datastore') || item.info.data.childType.string.includes('StoragePod'))) return this.folderDatastoreContextMenu;
    if (item.type === 'Folder' && (item.info.data.childType.string.includes('VirtualMachine') || item.info.data.childType.string.includes('VirtualApp'))) return this.folderVMContextMenu;
    if (item.type === 'Folder' && (item.info.data.childType.string.includes('Network') || item.info.data.childType.string.includes('DistributedVirtualSwitch'))) return this.folderNetworkContextMenu;
    if (item.type === 'Datacenter') return this.datacenterContextMenu;
    if (item.type === 'VirtualMachine') return this.VMContextMenu;
    if (item.type === 'Datastore') return this.datastoreContextMenu;
    if (item.type === 'StoragePod') return this.datastoreClusterContextMenu;
    if (item.type === 'ClusterComputeResource') return this.clusterComputeResourceContextMenu;
    if (item.type === 'HostSystem') return this.hostSystemContextMenu;
    if (item.type === 'ResourcePool') return this.resourcePoolContextMenu;
  }

  onTreeContextMenu(event: MouseEvent, node: IMNode): void {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuTree.menuData = { item: node };
    this.contextMenuTree.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem, node: IMNode): boolean {
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

  setActiveConnection(connection: IMConnection | string): void {
    if (typeof connection === 'string') return this.InfrastructureManager.setActiveConnection(connection);
    this.InfrastructureManager.setActiveConnection(connection.uuid);
  }

  getActiveConnection(): IMConnection {
    return this.InfrastructureManager.getActiveConnection();
  }

  setActiveView(type: string, data: any): void {
    this.setActiveConnection(data.info.uuid);
    this.activeView = {
      type,
      data
    };
  }
}
