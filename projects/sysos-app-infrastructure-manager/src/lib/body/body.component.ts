import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MatTreeFlatDataSource, MatTreeFlattener, MatMenuTrigger} from '@sysos/lib-angular-material';
import {Application} from '@sysos/lib-application';
import {SysosLibUtilsService} from '@sysos/lib-utils';
import {ContextMenuItem} from '@sysos/lib-types';

import {SysosAppInfrastructureManagerService} from '../services/sysos-app-infrastructure-manager.service';
import {SysosAppInfrastructureManagerContextMenusService} from '../services/sysos-app-infrastructure-manager-context-menus.service';
import {SysosAppInfrastructureNetappService} from '../services/netapp/sysos-app-infrastructure-netapp.service';
import {SysosAppInfrastructureVmwareService} from '../services/vmware/sysos-app-infrastructure-vmware.service';
import {SysosAppInfrastructureManagerTreeDataService} from "../services/sysos-app-infrastructure-manager-tree-data.service";
import {ImConnection} from '../types/im-connection';
import {ImTreeNode} from '../types/im-tree-node';

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

  constructor(private Utils: SysosLibUtilsService,
              private InfrastructureManager: SysosAppInfrastructureManagerService,
              private InfrastructureManagerTreeData: SysosAppInfrastructureManagerTreeDataService,
              private InfrastructureContextMenus: SysosAppInfrastructureManagerContextMenusService,
              private InfrastructureManagerNetApp: SysosAppInfrastructureNetappService,
              private InfrastructureManagerVMWare: SysosAppInfrastructureVmwareService) {

    /**
     * @description Required to avoid circular dependency
     * @link{SysosAppInfrastructureManagerService#getObserverConnectGetData}
     */
    this.InfrastructureManager.getObserverConnectGetData().pipe(takeUntil(this.destroySubject$)).subscribe((connection) => {
      if (connection.type === 'netapp') this.InfrastructureManagerNetApp.getNetAppData(connection);
      if (connection.type === 'vmware') this.InfrastructureManagerVMWare.getVMWareData(connection);
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
      svContextMenu: this.InfrastructureContextMenus.svContextMenu,
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
    if (item.type === 'netapp') return this.contextMenus.svContextMenu;
    if (item.type === 'volume') return this.contextMenus.volumeContextMenu;
    if (item.type === 'snapshot') return this.contextMenus.volumeSnapshotContextMenu;
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

  setActiveConnection(connection: ImConnection | string): void {
    if (typeof connection === 'string') return this.InfrastructureManager.setActiveConnection(connection);
    this.InfrastructureManager.setActiveConnection(connection.uuid);
  }

  getActiveConnection(returnMain: boolean = false): ImConnection {
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
