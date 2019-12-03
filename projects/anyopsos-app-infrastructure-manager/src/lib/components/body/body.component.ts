import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';

import {Subject} from 'rxjs';
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
  @ViewChild(MatMenuTrigger) contextMenuTree: MatMenuTrigger;
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  activeConnection: string = null;
  activeObject: string = null;

  viewSide: boolean = true;
  contextMenuPosition = {x: '0px', y: '0px'};

  private contextMenus: {[s: string]: ContextMenuItem[]};

  treeControl: FlatTreeControl<InfrastructureManagerFlatNode> = new FlatTreeControl(node => node.level, node => node.expandable);
  private treeFlattener: MatTreeFlattener<ImTreeNode, InfrastructureManagerFlatNode> = new MatTreeFlattener(this.transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource: MatTreeFlatDataSource<ImTreeNode, InfrastructureManagerFlatNode> = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: InfrastructureManagerFlatNode) => node.expandable;
  treeTracker = (index, node) => node.uuid;

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

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  ngOnInit(): void {
    this.InfrastructureManager.activeObject.pipe(takeUntil(this.destroySubject$)).subscribe(activeObject => this.activeObject = activeObject);
    this.InfrastructureManager.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe(activeConnection => {
      this.activeConnection = activeConnection;

      if (this.activeConnection !== null && this.getActiveConnection().state === 'disconnected') {
        setTimeout(() => this.Utils.scrollTo('infrastructure-manager_main-body', true), 100);
      }
    });
    this.InfrastructureManagerTreeData.treeData.pipe(takeUntil(this.destroySubject$)).subscribe((data: ImTreeNode[]) => {

      // Save expanded nodes
      const expandedNodes = new Array<InfrastructureManagerFlatNode>();
      if (this.treeControl.dataNodes) {
        this.treeControl.dataNodes.forEach(node => {
          if (node.expandable && this.treeControl.isExpanded(node)) {
            expandedNodes.push(node);
          }
        });
      }

      this.dataSource.data = data;

      // Set expanded nodes
      if (expandedNodes) {
        expandedNodes.forEach(node => {
          this.treeControl.expand(this.treeControl.dataNodes.find(n => n.uuid === node.uuid));
        });
      }

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
      uuid: node.uuid,
      info: node.info,
      level
    };
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
}
