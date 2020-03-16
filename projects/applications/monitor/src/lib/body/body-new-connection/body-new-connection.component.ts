import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Observable, Subject} from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {AnyOpsOSLibCredentialHelpersService} from '@anyopsos/lib-credential';
import {AnyOpsOSLibSshHelpersService} from '@anyopsos/lib-ssh';
import {Credential} from '@anyopsos/module-credential';
import {ConnectionSftp, ConnectionSsh} from '@anyopsos/module-ssh';
import {ConnectionMonitor} from '@anyopsos/module-monitor';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

import {AnyOpsOSAppMonitorService} from '../../services/anyopsos-app-monitor.service';

interface LinkTo {
  type: string;
  nodes: DataObject[];
}

const nodesFilter = (opt: DataObject[], value: string | DataObject): DataObject[] => {
  const filterValue = (typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase());

  return opt.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'aamon-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnDestroy, OnInit {
  @ViewChild('scrollToElement', {static: false}) readonly scrollToElement: ElementRef<HTMLInputElement>;
  @Input() private readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();
  private InfrastructureManagerNodeGraph;
  private InfrastructureManagerObjectHelper;

  private currentGraphTopology: string = 'all';

  credentials: Credential[];
  sshConnections: ConnectionSsh[];
  connectionForm: FormGroup;
  newConnectionType: string = null;

  linkGroups: LinkTo[];

  linkToOptions: Observable<LinkTo[]>;

  nodes$: Promise<any>;
  topologies$: Promise<any>;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibApplication: AnyOpsOSLibApplicationService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibCredentialHelpers: AnyOpsOSLibCredentialHelpersService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly Utils: AnyOpsOSLibUtilsService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Monitor: AnyOpsOSAppMonitorService) {

    this.InfrastructureManagerNodeGraph = this.serviceInjector.get('AnyOpsOSAppInfrastructureManagerNodeGraphService');
  }

  ngOnInit(): void {

    this.nodes$ = this.InfrastructureManagerNodeGraph.setNodeGraphNodes(this.currentGraphTopology).catch((e: Error) => {
      this.logger.error('InfrastructureManager', 'Error while getting graph nodes', null, e);
    });

    this.topologies$ = this.InfrastructureManagerNodeGraph.getTopologies().catch((e: Error) => {
      this.logger.error('InfrastructureManager', 'Error while getting graph topologies', null, e);
    });

    /**
     * Create basic form
     */
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      url: ['', [
        Validators.required,
        Validators.pattern(/^([a-z0-9]+):\/\//)
      ]],
      withCredential: [false],
      credential: [''],
      linkTo: '',
      save: [true],
      autologin: [false],
      uuid: [null],
      type: [null]
    });

    // Listen for credentials changes
    this.LibCredentialHelpers.getAllCredentialsObserver()
      .pipe(takeUntil(this.destroySubject$)).subscribe((credentials: Credential[]) => this.credentials = credentials);

    // Listen for connections changes
    this.LibSshHelpers.getAllConnectionsObserver()
      .pipe(takeUntil(this.destroySubject$)).subscribe((connections: (ConnectionSsh | ConnectionSftp)[]) => {

      const sshConnections: ConnectionSsh[] = connections.filter((connection: ConnectionSsh | ConnectionSftp) => connection.type === 'ssh') as ConnectionSsh[];
      this.onSshConnectionsChange(sshConnections);
    });

    // Listen for activeConnection change
    this.Monitor.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: ConnectionMonitor | null) => this.onActiveConnectionChange(activeConnection));

    this.generateLinkGroups();
  }

  ngOnDestroy(): void {
    this.connectionForm.reset();

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onSshConnectionsChange(connections: ConnectionSsh[]): void {
    this.sshConnections = connections;

    if (this.sshConnections.length === 0) return this.connectionForm.controls.hopServerUuid.disable();
  }

  private onActiveConnectionChange(activeConnection: ConnectionMonitor | null): void {

    // Reset main Form
    if (!activeConnection) {
      this.connectionForm.reset();
      return this.newConnectionType = null;
    }

    // Set Form controls with currentCredential data
    this.newConnectionType = activeConnection.type;

    Object.keys(activeConnection).forEach((item) => {
      if (this.connectionForm.controls[item]) this.connectionForm.controls[item].setValue(activeConnection[item]);
    });
  }

  private generateLinkGroups() {
    // Create linkGroups with VMs, Nodes, Pods...
    const linkVirtualMachines = this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'VirtualMachine');
    const linkPods = this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'Pod');
    const linkNodes = this.InfrastructureManagerObjectHelper.getObjectsByType(null, 'Node');
    if (linkVirtualMachines.length !== 0 || linkPods.length !== 0 || linkNodes.length !== 0) {
      // TODO: Make this private
      this.linkGroups = [
        {
          type: 'Virtual Machines',
          nodes: linkVirtualMachines
        },
        {
          type: 'Pods',
          nodes: linkPods
        },
        {
          type: 'Nodes',
          nodes: linkNodes
        }
      ];
    }

    this.linkToOptions = this.connectionForm.get('linkTo').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterGroup(value))
      );
  }

  private filterGroup(value: string): LinkTo[] {
    if (value) {
      return this.linkGroups
        .map(group => ({type: group.type, nodes: nodesFilter(group.nodes, value)}))
        .filter(group => group.nodes.length > 0);
    }

    return this.linkGroups;
  }

  /**
   * Form getter
   */
  get f(): { [key: string]: AbstractControl } { return this.connectionForm.controls; }

  /**
   * mat-autocomplete displayWith
   */
  displayFn(node?: DataObject): string | undefined {
    return node ? node.name : undefined;
  }

  setConnectionType(type: string): void {
    this.newConnectionType = type;
    (this.connectionForm.controls.type as FormControl).setValue(type);
  }

  async sendConnect(saveOnly: boolean = false): Promise<void> {

    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    const littleModalRef: MatDialogRef<any> = await this.LibModal.openLittleModal(
      this.Monitor.getBodyContainerRef(),
      'PLEASE WAIT',
      (saveOnly ? 'Saving connection...' : 'Connecting to server...')
    );

    this.Monitor.connect(this.connectionForm.value, saveOnly).then((connection: ConnectionMonitor) => {
      this.Monitor.setActiveConnectionUuid(connection.uuid);

      this.LibModal.closeModal(littleModalRef.id);
    }).catch((e: any) => {
      this.logger.error('Monitor', 'Error while connecting', null, e);

      this.LibModal.changeModalType(littleModalRef.id, 'danger');
      this.LibModal.changeModalText(littleModalRef.id, e);
    });
  }

  manageCredentials(): void {
    this.LibApplication.openApplication('credentials-manager');
  }

  manageSshConnections(): void {
    this.LibApplication.openApplication('ssh');
  }

  /**
   * Diagram graph
   */
  scrollTo(): void {
    this.Utils.scrollTo('monitor_main-body', true);
  }

  selectedTopologyChange($event) {
    this.currentGraphTopology = $event;
  }

  selectedNodeChange($event) {
    return this.InfrastructureManagerNodeGraph.selectedNodeChange($event);
  }
}
