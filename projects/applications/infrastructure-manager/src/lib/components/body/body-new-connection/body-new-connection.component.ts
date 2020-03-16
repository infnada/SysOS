import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {interval, Observable, Subject} from 'rxjs';

import {MatDialogRef} from '@anyopsos/lib-angular-material';
import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibLoggerService} from '@anyopsos/lib-logger';
import {AnyOpsOSLibCredentialHelpersService} from '@anyopsos/lib-credential';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {AnyOpsOSLibSshHelpersService} from '@anyopsos/lib-ssh';
import {ConnectionSsh, ConnectionSftp} from '@anyopsos/module-ssh';
import {Credential} from '@anyopsos/module-credential';
import {ConnectionTypes} from '@anyopsos/backend-core/app/types/connection-types';

import {AnyOpsOSAppInfrastructureManagerService} from '../../../services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerNodeGraphService} from '../../../services/anyopsos-app-infrastructure-manager-node-graph.service';

@Component({
  selector: 'aaim-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnInit, OnDestroy {
  @ViewChild('scrollToElement', {static: false}) readonly scrollToElement: ElementRef<HTMLInputElement>;
  @Input() private readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();
  private currentGraphTopology: string = 'all';

  credentials: Credential[];
  sshConnections: ConnectionSsh[];
  connectionForm: FormGroup;
  newConnectionType: string = null;

  nodes$: Promise<any>;
  topologies$: Promise<any>;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly logger: AnyOpsOSLibLoggerService,
              private readonly LibApplication: AnyOpsOSLibApplicationService,
              private readonly LibModal: AnyOpsOSLibModalService,
              private readonly LibCredentialHelpers: AnyOpsOSLibCredentialHelpersService,
              private readonly LibSshHelpers: AnyOpsOSLibSshHelpersService,
              private readonly Utils: AnyOpsOSLibUtilsService,
              private readonly InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private readonly InfrastructureManagerNodeGraph: AnyOpsOSAppInfrastructureManagerNodeGraphService) {

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
      clusterName: [''],
      clusterServer: [''],
      clusterCa: [''],
      host: [''],
      port: [0],
      credential: [''],
      hopServerUuid: [null],
      type: ['', Validators.required],
      community: ['public'],
      autoLogin: [true],
      uuid: [null]
    });

    // Update validators on type change
    this.connectionForm.get('type').valueChanges
      .pipe(takeUntil(this.destroySubject$)).subscribe((type: string) => this.onFormTypeChanges(type));

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
    this.InfrastructureManager.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: ConnectionTypes | null) => this.onActiveConnectionChange(activeConnection));
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

  private onActiveConnectionChange(activeConnection: ConnectionTypes | null): void {

    // Reset main Form
    if (!activeConnection) {
      this.connectionForm.reset({
        autoLogin: true,
        uuid: null
      });

      return this.newConnectionType = null;
    }

    this.newConnectionType = activeConnection.type;

    if (activeConnection.type === 'kubernetes' || activeConnection.type === 'docker') {
      (this.f.clusterName as FormControl).setValue(activeConnection.clusterName);
      (this.f.clusterServer as FormControl).setValue(activeConnection.clusterServer);
      (this.f.clusterCa as FormControl).setValue(activeConnection.clusterCa);
    } else {
      (this.f.host as FormControl).setValue(activeConnection.host);
      (this.f.port as FormControl).setValue(activeConnection.port);
    }

    if (activeConnection.type === 'snmp') {
      (this.f.community as FormControl).setValue(activeConnection.community);
    } else {
      (this.f.credential as FormControl).setValue(activeConnection.credential);
    }

    (this.f.description as FormControl).setValue(activeConnection.description);
    (this.f.type as FormControl).setValue(activeConnection.type);
    (this.f.autoLogin as FormControl).setValue(activeConnection.autoLogin);
    (this.f.hopServerUuid as FormControl).setValue(activeConnection.hopServerUuid);
    (this.f.uuid as FormControl).setValue(activeConnection.uuid);
  }

  private onFormTypeChanges(type: string): void {

    if (type === 'kubernetes') {
      this.connectionForm.controls.clusterName.setValidators([Validators.required]);
      this.connectionForm.controls.clusterServer.setValidators([Validators.required]);
      this.connectionForm.controls.clusterCa.setValidators([Validators.required]);

      this.connectionForm.controls.host.setValidators([]);
      this.connectionForm.controls.port.setValidators([]);
    } else {
      this.connectionForm.controls.host.setValidators([Validators.required]);
      this.connectionForm.controls.port.setValidators([Validators.required]);

      this.connectionForm.controls.clusterName.setValidators([]);
      this.connectionForm.controls.clusterServer.setValidators([]);
      this.connectionForm.controls.clusterCa.setValidators([]);
    }

    this.connectionForm.controls.clusterName.updateValueAndValidity();
    this.connectionForm.controls.clusterServer.updateValueAndValidity();
    this.connectionForm.controls.clusterCa.updateValueAndValidity();
    this.connectionForm.controls.host.updateValueAndValidity();
    this.connectionForm.controls.port.updateValueAndValidity();

    if (type === 'snmp') {
      this.connectionForm.controls.community.setValidators([Validators.required]);

      this.connectionForm.controls.credential.setValidators([]);
    } else {
      this.connectionForm.controls.credential.setValidators([Validators.required]);

      this.connectionForm.controls.community.setValidators([]);
    }

    this.connectionForm.controls.credential.updateValueAndValidity();
    this.connectionForm.controls.community.updateValueAndValidity();
  }

  /**
   * Form getter
   */
  get f(): { [key: string]: AbstractControl } { return this.connectionForm.controls; }

  setConnectionType(type: string): void {
    this.newConnectionType = type;

    (this.connectionForm.controls.type as FormControl).setValue(type);
    (this.connectionForm.controls.port as FormControl).setValue(
      (type === 'vmware' ? 443 : (type === 'netapp' ? 443 : (type === 'linux' ? 22 : (type === 'snmp' ? 161 : 0))))
    );
  }

  async sendConnect(saveOnly: boolean = false): Promise<void> {

    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    const littleModalRef: MatDialogRef<any> = await this.LibModal.openLittleModal(
      this.InfrastructureManager.getBodyContainerRef(),
      'PLEASE WAIT',
      (saveOnly ? 'Saving connection...' : 'Connecting to server...')
    );

    this.InfrastructureManager.connect(this.connectionForm.value, saveOnly).then((connection: ConnectionTypes) => {
      this.InfrastructureManager.setActiveConnectionUuid(connection.uuid, connection.type);

      this.LibModal.closeModal(littleModalRef.id);
    }).catch((e: any) => {
      this.logger.error('InfrastructureManager', 'Error while connecting', null, e);

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
   * NodeGraph
   */
  scrollTo(): void {
    this.Utils.angularElementScrollTo(this.scrollToElement.nativeElement.parentElement.parentElement, true);
  }

  selectedTopologyChange($event) {
    this.currentGraphTopology = $event.id;
  }

  selectedNodeChange($event) {
    return this.InfrastructureManagerNodeGraph.selectedNodeChange($event);
  }
}
