import {Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

import {Observable, of as observableOf, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MatTreeFlatDataSource, MatTreeFlattener, MatMenuTrigger, FlatTreeControl} from '@anyopsos/lib-angular-material';
import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {ContextMenuItem} from '@anyopsos/lib-types';
import {AnyOpsOSLibNodeTemplateHelpersService} from '@anyopsos/lib-node';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';
import {ConnectionTypes} from '@anyopsos/backend-core/app/types/connection-types';

import {AnyOpsOSAppInfrastructureManagerService} from '../../services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerTreeDataService} from '../../services/anyopsos-app-infrastructure-manager-tree-data.service';
import {AnyOpsOSAppInfrastructureManagerContextMenusService} from '../../services/anyopsos-app-infrastructure-manager-context-menus.service';

import {ImTreeNode} from '../../types/im-tree-node';

interface InfrastructureManagerFlatNode {
  expandable: boolean;
  name: string;
  type: string;
  info: { uuid: string; };
  level: number;
}

@Component({
  selector: 'aaim-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {
  @ViewChild('bodyContainer', {static: true, read: ViewContainerRef}) private readonly bodyContainer: ViewContainerRef;
  @ViewChild(MatMenuTrigger, {static: false}) readonly contextMenuTree: MatMenuTrigger;
  @Input() readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  activeConnectionUuid: string | null = null;
  activeObjectUuid: string | null = null;

  contextMenuPosition = {x: '0px', y: '0px'};

  private contextMenus: { [s: string]: ContextMenuItem[]; };

  treeControl: FlatTreeControl<InfrastructureManagerFlatNode>;
  dataSource: MatTreeFlatDataSource<ImTreeNode, InfrastructureManagerFlatNode>;
  private readonly treeFlattener: MatTreeFlattener<ImTreeNode, InfrastructureManagerFlatNode>;
  private expandedNodeSet: Set<string> = new Set();

  private readonly transformer = (node: ImTreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      type: node.type,
      info: node.info,
      level
    };
  };
  private readonly getLevel = (node: InfrastructureManagerFlatNode) => node.level;
  private readonly isExpandable = (node: InfrastructureManagerFlatNode) => node.expandable;
  private readonly getChildren = (node: ImTreeNode): Observable<ImTreeNode[]> => observableOf(node.children);
  readonly hasChild = (_: number, nodeData: InfrastructureManagerFlatNode) => nodeData.expandable;


  constructor(private readonly Utils: AnyOpsOSLibUtilsService,
              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private readonly InfrastructureManagerTreeData: AnyOpsOSAppInfrastructureManagerTreeDataService,
              private readonly InfrastructureContextMenus: AnyOpsOSAppInfrastructureManagerContextMenusService,
              public readonly LibNodeTemplateHelpers: AnyOpsOSLibNodeTemplateHelpersService) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<InfrastructureManagerFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource<ImTreeNode, InfrastructureManagerFlatNode>(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    // Set bodyContainerRef, this is used by Modals
    this.InfrastructureManager.setBodyContainerRef(this.bodyContainer);

    // Listen for treeData change
    this.InfrastructureManagerTreeData.treeData
      .pipe(takeUntil(this.destroySubject$)).subscribe((data: ImTreeNode[]) => this.rebuildTreeForData(data));

    // Listen for activeObject change
    this.InfrastructureManager.activeObjectUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeObjectUuid: string | null) => this.activeObjectUuid = activeObjectUuid);

    // Listen for activeConnectionUuid change
    this.InfrastructureManager.activeConnectionUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string | null) => this.activeConnectionUuid = activeConnectionUuid);

    // Listen for activeConnection change
    this.InfrastructureManager.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: ConnectionTypes | null) => this.onActiveConnectionChange(activeConnection));

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

  private onActiveConnectionChange(activeConnection: ConnectionTypes | null): void {

    // Show Connection Form
    if (activeConnection?.state === 'disconnected') {
      setTimeout(() => this.Utils.angularElementScrollTo(this.InfrastructureManager.getBodyContainerRef().element.nativeElement), 100);
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
  getActiveConnectionObs(): Observable<ConnectionTypes | null> {
    return this.InfrastructureManager.activeConnection;
  }

  getActiveObjectObs(): Observable<DataObject | null> {
    return this.InfrastructureManager.activeObject;
  }

  setActiveView(data: ImTreeNode): void {

    // Is a DataObject
    // @ts-ignore TODO
    if (data.info?.mainUuid) return this.InfrastructureManager.setActiveObjectUuid(data.info.uuid);

    // Is a ConnectionType
    return this.InfrastructureManager.setActiveConnectionUuid(data.info.uuid, data.info.obj.type);
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */

  private rebuildTreeForData(data: ImTreeNode[]) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(this.treeControl.dataNodes, Array.from(this.expandedNodeSet));
  }

  private rememberExpandedTreeNodes(treeControl: FlatTreeControl<InfrastructureManagerFlatNode>, expandedNodeSet: Set<string>) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach((node: InfrastructureManagerFlatNode) => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {

          // capture latest expanded state
          expandedNodeSet.add(node.info.uuid);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(treeControl: FlatTreeControl<InfrastructureManagerFlatNode>, expandedNodeSet: Set<string>) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach((nodeUuid) => {

        // maintain expanded node state
        if (!treeControl.dataNodes.find((node: InfrastructureManagerFlatNode) => node.info.uuid === nodeUuid)) {

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
      if (idSet.has(node.info.uuid)) {
        this.treeControl.expand(node);
      }
    });
  }
}
