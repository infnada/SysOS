import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {AnyOpsOSLibApplicationService, Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibServiceInjectorService} from '@anyopsos/lib-service-injector';
import {AnyOpsOSLibModalService} from '@anyopsos/lib-modal';
import {SshConnection} from '@anyopsos/app-ssh';
import {Credential} from '@anyopsos/module-credential';

import {AnyOpsOSAppSftpService} from '../../../services/anyopsos-app-sftp.service';
import {SftpConnection} from '../../../types/sftp-connection';

@Component({
  selector: 'aasftp-body-new-connection',
  templateUrl: './body-new-connection.component.html',
  styleUrls: ['./body-new-connection.component.scss']
})
export class BodyNewConnectionComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();
  private CredentialsManager;
  private Ssh;

  credentials: Credential[];
  sshConnections: SshConnection[];
  connectionForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private Applications: AnyOpsOSLibApplicationService,
              private serviceInjector: AnyOpsOSLibServiceInjectorService,
              private Modal: AnyOpsOSLibModalService,
              private Sftp: AnyOpsOSAppSftpService) {

    this.CredentialsManager = this.serviceInjector.get('AnyOpsOSAppCredentialsManagerService');
    this.Ssh = this.serviceInjector.get('AnyOpsOSAppSshService');
  }

  ngOnInit(): void {
    this.connectionForm = this.formBuilder.group({
      description: ['', Validators.required],
      host: ['', Validators.required],
      port: [22, Validators.required],
      credential: ['', Validators.required],
      hopServerUuid: [null],
      save: [true],
      autologin: [false],
      uuid: [null]
    });

    // Listen for credentials changes
    this.CredentialsManager.credentials
      .pipe(takeUntil(this.destroySubject$)).subscribe((credentials: Credential[]) => this.credentials = credentials);

    // Listen for connections changes
    this.Ssh.connections
      .pipe(takeUntil(this.destroySubject$)).subscribe((connections: SshConnection[]) => this.onConnectionsChange(connections));

    // Listen for activeConnection change
    this.Sftp.activeConnection
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeConnectionUuid: string) => this.onActiveConnectionChange(activeConnectionUuid));
  }

  ngOnDestroy(): void {
    this.connectionForm.reset();

    // Remove all listeners
    this.destroySubject$.next();
  }

  private onConnectionsChange(connections: SshConnection[]): void {
    this.sshConnections = connections;

    if (this.sshConnections.length === 0) return this.connectionForm.controls.hopServerUuid.disable();
    this.connectionForm.controls.hopServerUuid.enable();
  }

  private onActiveConnectionChange(activeConnectionUuid: string): void {
    if (!activeConnectionUuid) {
      return this.connectionForm.reset({
        port: 22,
        save: true,
        autologin: false,
        hopServerUuid: null,
        uuid: null
      });
    }

    // Set Form controls with currentConnection data
    const currentConnection = this.getActiveConnection();
    Object.keys(currentConnection).forEach((item) => {
      if (this.connectionForm.controls[item]) this.connectionForm.controls[item].setValue(currentConnection[item]);
    });
  }

  /**
   * Form getter
   */
  get f(): { [key: string]: AbstractControl } { return this.connectionForm.controls; }

  sendConnect(saveOnly: boolean = false): void {
    // stop here if form is invalid
    if (this.connectionForm.invalid) return;

    this.Modal.openLittleModal('PLEASE WAIT', (saveOnly ? 'Saving connection...' : 'Connecting to server...'), '.window--sftp .window__main', 'plain').then(() => {
      this.Sftp.connect(this.connectionForm.value, saveOnly);
    });
  }

  manageCredentials(): void {
    this.Applications.openApplication('credentials-manager');
  }

  manageSshConnections(): void {
    this.Applications.openApplication('ssh');
  }

  getActiveConnection(): SftpConnection {
    return this.Sftp.getActiveConnection();
  }
}
