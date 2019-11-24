import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {Application, AnyOpsOSLibApplicationService} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {AnyOpsOSLibUtilsService} from '@anyopsos/lib-utils';
import {Credential} from '@anyopsos/app-credentials-manager';

import {AnyOpsOSAppInfrastructureManagerService} from '../../services/anyopsos-app-infrastructure-manager.service';
import {AnyOpsOSAppInfrastructureManagerNodeGraphService} from '../../services/anyopsos-app-infrastructure-manager-node-graph.service';

import {ImConnection} from '../../types/connections/im-connection';
import {ConnectionTypes} from '../../types/connections/connection-types';

@Component({
  selector: 'saim-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnInit, OnDestroy {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private CredentialsManager;

  credentials: Credential[];
  connectionForm: FormGroup;
  submitted: boolean = false;
  newConnectionType: string = null;

  constructor(private formBuilder: FormBuilder,
              private Applications: AnyOpsOSLibApplicationService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private Utils: AnyOpsOSLibUtilsService,
              private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService,
              private InfrastructureManagerNodeGraph: AnyOpsOSAppInfrastructureManagerNodeGraphService) {

    this.CredentialsManager = this.serviceInjector.get('AnyOpsOSAppCredentialsManagerService');
    this.CredentialsManager.credentials.pipe(takeUntil(this.destroySubject$)).subscribe(credentials => this.credentials = credentials);
  }

  ngOnDestroy() {
    this.connectionForm.reset();
    this.destroySubject$.next();
  }

  ngOnInit() {

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
      type: ['', Validators.required],
      community: ['public'],
      save: [true],
      autologin: [true],
      uuid: [null]
    });

    /**
     * Update validators on type change
     */
    this.connectionForm.get('type').valueChanges
      .pipe(takeUntil(this.destroySubject$)).subscribe(type => {

        if (type === 'kubernetes') {
          this.connectionForm.controls.clusterName.setValidators([Validators.required]);
          this.connectionForm.controls.clusterServer.setValidators([Validators.required]);
          this.connectionForm.controls.clusterCa.setValidators([Validators.required]);
          this.connectionForm.controls.clusterName.updateValueAndValidity();
          this.connectionForm.controls.clusterServer.updateValueAndValidity();
          this.connectionForm.controls.clusterCa.updateValueAndValidity();
        } else {
          this.connectionForm.controls.host.setValidators([Validators.required]);
          this.connectionForm.controls.port.setValidators([Validators.required]);
          this.connectionForm.controls.host.updateValueAndValidity();
          this.connectionForm.controls.port.updateValueAndValidity();
        }

        if (type === 'snmp') {
          this.connectionForm.controls.community.setValidators([Validators.required]);
          this.connectionForm.controls.community.updateValueAndValidity();
        } else {
          this.connectionForm.controls.credential.setValidators([Validators.required]);
          this.connectionForm.controls.credential.updateValueAndValidity();
        }
    });

    /**
     * Set Form data on connection change
     */
    this.InfrastructureManager.activeConnection.pipe(takeUntil(this.destroySubject$)).subscribe((activeConnection: string) => {
      if (!activeConnection) {

        // Reset form if needed on 'New Connection'
        // If valid is because user clicked on a connection with state 'disconnected' and then did 'New Connection'
        if (this.connectionForm.touched || this.connectionForm.valid) this.connectionForm.reset();
        return this.newConnectionType = null;
      }

      const currentConnection = this.getActiveConnection();

      this.newConnectionType = currentConnection.type;

      if (currentConnection.type === 'kubernetes' || currentConnection.type === 'docker') {
        (this.f.clusterName as FormControl).setValue(currentConnection.clusterName);
        (this.f.clusterServer as FormControl).setValue(currentConnection.clusterServer);
        (this.f.clusterCa as FormControl).setValue(currentConnection.clusterCa);
      } else {
        (this.f.host as FormControl).setValue(currentConnection.host);
        (this.f.port as FormControl).setValue(currentConnection.port);
      }

      if (currentConnection.type === 'snmp') {
        (this.f.community as FormControl).setValue(currentConnection.community);
      } else {
        (this.f.credential as FormControl).setValue(currentConnection.credential);
      }

      (this.f.description as FormControl).setValue(currentConnection.description);
      (this.f.type as FormControl).setValue(currentConnection.type);
      (this.f.save as FormControl).setValue(currentConnection.save);
      (this.f.autologin as FormControl).setValue(currentConnection.autologin);
      (this.f.uuid as FormControl).setValue(currentConnection.uuid);
    });
  }

  get f() { return this.connectionForm.controls; }

  setConnectionType(type: string): void {
    this.newConnectionType = type;

    (this.connectionForm.controls.type as FormControl).setValue(type);
    (this.connectionForm.controls.port as FormControl).setValue(
      (type === 'vmware' ? 443 : (type === 'netapp' ? 443 : (type === 'linux' ? 22 : (type === 'snmp' ? 161 : 0))))
    );
  }

  sendConnect(saveOnly: boolean = false): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    this.Modal.openLittleModal('PLEASE WAIT', (saveOnly ? 'Saving connection...' : 'Connecting to server...'), '.window--infrastructure-manager .window__main', 'plain').then(() => {
      this.InfrastructureManager.connect(this.connectionForm.value, saveOnly);
      this.submitted = false;

      if (saveOnly) this.connectionForm.reset();
    });
  }

  manageCredentials() {
    this.Applications.openApplication('credentials-manager');
  }

  getActiveConnection(): ConnectionTypes {
    return this.InfrastructureManager.getActiveConnection();
  }

  /**
   * Weavescope graph
   */
  scrollTo(): void {
    this.Utils.scrollTo('infrastructure-manager_main-body', true);
  }

  setNodeGraphNodes() {
    return this.InfrastructureManagerNodeGraph.setNodeGraphNodes();
  }

  selectedNodeChange($event) {
    return this.InfrastructureManagerNodeGraph.selectedNodeChange($event);
  }
}
