import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';

import {Observable, of as observableOf, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MatTreeFlatDataSource, MatTreeFlattener, MatMenuTrigger} from '@anyopsos/lib-angular-material';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {ContextMenuItem} from '@anyopsos/lib-types';

import {AnyOpsOSAppInfrastructureManagerService} from '../../services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerTreeDataService} from '../../services/anyopsos-app-infrastructure-manager-tree-data.service';
import {AnyOpsOSAppInfrastructureManagerContextMenusService} from '../../services/anyopsos-app-infrastructure-manager-context-menus.service';
import {AnyOpsOSAppInfrastructureVmwareService} from '../../services/vmware/anyopsos-app-infrastructure-vmware.service';
import {AnyOpsOSAppInfrastructureNetappService} from '../../services/netapp/anyopsos-app-infrastructure-netapp.service';
import {AnyOpsOSAppInfrastructureKubernetesService} from '../../services/kubernetes/anyopsos-app-infrastructure-kubernetes.service';
import {AnyOpsOSAppInfrastructureDockerService} from '../../services/docker/anyopsos-app-infrastructure-docker.service';
import {AnyOpsOSAppInfrastructureLinuxService} from '../../services/linux/anyopsos-app-infrastructure-linux.service';
import {AnyOpsOSAppInfrastructureSnmpService} from '../../services/snmp/anyopsos-app-infrastructure-snmp.service';
import {AnyOpsOSAppInfrastructureManagerTemplateHelperService} from '../../services/anyopsos-app-infrastructure-manager-template-helper.service';

import {ImTreeNode} from '../../types/im-tree-node';
import {ImDataObject} from '../../types/im-data-object';
import {ConnectionTypes} from '../../types/connections/connection-types';

interface InfrastructureManagerFlatNode {
  expandable: boolean;
  name: string;
  uuid: string;
  level: number;
  type: string;
}

@Component({
  selector: 'saim-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger, {static: false}) contextMenuTree: MatMenuTrigger;
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  activeConnection: string = null;
  activeObject: string = null;

  contextMenuPosition = {x: '0px', y: '0px'};

  private contextMenus: {[s: string]: ContextMenuItem[]};

  treeControl: FlatTreeControl<InfrastructureManagerFlatNode>;
  dataSource: MatTreeFlatDataSource<ImTreeNode, InfrastructureManagerFlatNode>;
  private readonly treeFlattener: MatTreeFlattener<ImTreeNode, InfrastructureManagerFlatNode>;
  private expandedNodeSet: Set<string> = new Set();

  private transformer = (node: ImTreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      type: node.type,
      uuid: node.uuid,
      info: node.info,
      level
    };
  }
  private getLevel = (node: InfrastructureManagerFlatNode) => node.level;
  private isExpandable = (node: InfrastructureManagerFlatNode) => node.expandable;
  private getChildren = (node: ImTreeNode): Observable<ImTreeNode[]> => observableOf(node.children);
  hasChild = (_: number, nodeData: InfrastructureManagerFlatNode) => nodeData.expandable;


  constructor(private Utils: AnyOpsOSLibUtilsService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerTreeData: AnyOpsOSAppInfrastructureManagerTreeDataService,
              private InfrastructureContextMenus: AnyOpsOSAppInfrastructureManagerContextMenusService,
              private InfrastructureManagerNetApp: AnyOpsOSAppInfrastructureNetappService,
              private InfrastructureManagerVMWare: AnyOpsOSAppInfrastructureVmwareService,
              private InfrastructureManagerKubernetes: AnyOpsOSAppInfrastructureKubernetesService,
              private InfrastructureManagerDocker: AnyOpsOSAppInfrastructureDockerService,
              private InfrastructureManagerLinux: AnyOpsOSAppInfrastructureLinuxService,
              private InfrastructureManagerSNMP: AnyOpsOSAppInfrastructureSnmpService,
              public InfrastructureManagerTemplateHelper: AnyOpsOSAppInfrastructureManagerTemplateHelperService) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<InfrastructureManagerFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource<ImTreeNode, InfrastructureManagerFlatNode>(this.treeControl, this.treeFlattener);

    /**
     * @description Required to avoid circular dependency
     * @link{AnyOpsOSAppInfrastructureManagerService#getObserverConnectGetData}
     */
    this.InfrastructureManager.getObserverConnectGetData()
      .pipe(takeUntil(this.destroySubject$)).subscribe((connection) => {
        if (connection.type === 'netapp') this.InfrastructureManagerNetApp.getNetAppData(connection);
        if (connection.type === 'vmware') this.InfrastructureManagerVMWare.getVMWareData(connection);
        if (connection.type === 'kubernetes') this.InfrastructureManagerKubernetes.initConnection(connection);
        if (connection.type === 'docker') this.InfrastructureManagerDocker.initConnection(connection);
        if (connection.type === 'linux') this.InfrastructureManagerLinux.initConnection(connection);
        if (connection.type === 'snmp') this.InfrastructureManagerSNMP.initConnection(connection);
      });

  }

  ngOnInit(): void {

    // Listen for treeData change
    this.InfrastructureManagerTreeData.treeData
      .pipe(takeUntil(this.destroySubject$)).subscribe(data => this.rebuildTreeForData(data));

    // Listen for activeObject change
    this.InfrastructureManager.activeObject
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeObjectUuid: string) => this.activeObject = activeObjectUuid);

    // Listen for activeConnection change
    this.InfrastructureManager.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.onActiveConnectionChange(activeConnectionUuid));

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

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onActiveConnectionChange(activeConnectionUuid: string): void {
    this.activeConnection = activeConnectionUuid;

    // Show Connection Form
    if (this.activeConnection !== null && this.getActiveConnection().state === 'disconnected') {
      setTimeout(() => this.Utils.scrollTo('infrastructure-manager_main-body', true), 100);
    }
  }

  /**
   * ContextMenu
   */
  treeContextMenuItems(item: ImTreeNode): ContextMenuItem[] {
    // NetApp
    if (item.type === 'netapp') return this.contextMenus.netappContextMenu;
    if (item.type === 'volume') return this.contextMenus.volumeContextMenu;
    if (item.type === 'snapshot') return this.contextMenus.volumeSnapshotContextMenu;

    // VMWare
    if (item.type === 'vmware') return this.contextMenus.vmwareContextMenu;
    if (item.type === 'Folder' && item.info.data.childType.string.includes('Datacenter')) return this.contextMenus.folderDatacenterContextMenu;
    if (item.type === 'Folder' &&
      (item.info.data.childType.string.includes('Datastore') || item.info.data.childType.string.includes('StoragePod'))
    ) return this.contextMenus.folderDatastoreContextMenu;
    if (item.type === 'Folder' &&
      (item.info.data.childType.string.includes('VirtualMachine') || item.info.data.childType.string.includes('VirtualApp'))
    ) return this.contextMenus.folderVMContextMenu;
    if (item.type === 'Folder' &&
      (item.info.data.childType.string.includes('Network') || item.info.data.childType.string.includes('DistributedVirtualSwitch'))
    ) return this.contextMenus.folderNetworkContextMenu;
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

  /**
   * Connections data
   */
  getActiveConnection(): ConnectionTypes {
    return this.InfrastructureManager.getActiveConnection();
  }

  getActiveObject(): ImDataObject {
    return this.InfrastructureManager.getActiveObject();
  }

  setActiveView(data: ImDataObject): void {
    if (data.info.mainUuid) {
      this.InfrastructureManager.setActiveConnection(data.info.mainUuid);
      return this.InfrastructureManager.setActiveObject(data.info.uuid);
    }

    return this.InfrastructureManager.setActiveConnection(data.info.uuid);
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */

  private rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(this.treeControl.dataNodes, Array.from(this.expandedNodeSet));
  }

  private rememberExpandedTreeNodes(treeControl: FlatTreeControl<InfrastructureManagerFlatNode>, expandedNodeSet: Set<string>) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach((node) => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          // capture latest expanded state
          expandedNodeSet.add(node.uuid);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(treeControl: FlatTreeControl<InfrastructureManagerFlatNode>, expandedNodeSet: Set<string>) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach((nodeUuid) => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find((n) => n.uuid === nodeUuid)) {
          // if the tree doesn't have the previous node, remove it from the expanded list
          expandedNodeSet.delete(nodeUuid);
        }
      });
    }
  }

  private expandNodesById(flatNodes: InfrastructureManagerFlatNode[], ids: string[]) {
    if (!flatNodes || flatNodes.length === 0) return;
    const idSet = new Set(ids);
    return flatNodes.forEach((node) => {
      if (idSet.has(node.uuid)) {
        this.treeControl.expand(node);
      }
    });
  }
}
