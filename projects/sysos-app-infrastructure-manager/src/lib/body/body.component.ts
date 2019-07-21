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
  VMContextMenu: ContextMenuItem[];
  datastoreContextMenu: ContextMenuItem[];

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
      this.dataSource.data = data;
      this.treeControl.expandAll();
    });

    // Set Context Menus
    this.svContextMenu = this.InfrastructureContextMenus.svContextMenu;
    this.volumeContextMenu = this.InfrastructureContextMenus.volumeContextMenu;
    this.volumeSnapshotContextMenu = this.InfrastructureContextMenus.volumeSnapshotContextMenu;
    this.volumeVMSnapshotContextMenu = this.InfrastructureContextMenus.volumeVMSnapshotContextMenu;
    this.VMContextMenu = this.InfrastructureContextMenus.VMContextMenu;
    this.datastoreContextMenu = this.InfrastructureContextMenus.datastoreContextMenu;
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
    if (item.type === 'netapp' || item.type === 'vmware') return this.svContextMenu;
    if (item.type === 'volume') return this.volumeContextMenu;
    if (item.type === 'snapshot') return this.volumeSnapshotContextMenu;
    if (item.type === 'VirtualMachine') return this.VMContextMenu;
    if (item.type === 'Datastore') return this.datastoreContextMenu;
  }

  onTreeContextMenu(event: MouseEvent, node: IMNode): void {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenuTree.menuData = { item: node };
    this.contextMenuTree.openMenu();
  }

  checkIfDisabled(item: ContextMenuItem): boolean {
    if (item.disabled) return item.disabled();
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

  setActiveConnection(connection: IMConnection): void {
    this.InfrastructureManager.setActiveConnection(connection.uuid);
  }

  getActiveConnection(): IMConnection {
    return this.InfrastructureManager.getActiveConnection();
  }

  setActiveView(type: string, data: {}): void {
    console.log('set');
    this.activeView = {
      type,
      data
    };
  }
}
